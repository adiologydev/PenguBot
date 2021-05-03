const { Route } = require("../index");
const config = require("../../config.js");

module.exports = class extends Route {

    constructor(...args) {
        super(...args, { route: "syncdb/:type/:id" });
    }

    async get(request, response) {
        if (!request.headers.authorization || request.headers.authorization !== config.dashboard.internalSecret) {
            response.statusCode = 401;
            return response.end(JSON.stringify({ success: false, body: "Not Authorized" }));
        }

        const { type, id } = request.params;
        if (!type || !id) {
            response.statusCode = 400;
            return response.end(JSON.stringify({ success: false, body: "No Type or ID Provided" }));
        }

        if (type === "server") {
            const guild = await this.client.shard.broadcastEval(`this.guilds.cache.get("${id}") ? this.guilds.cache.get("${id}").settings.sync(true) : null`)
                .catch(() => null);

            if (!guild || !guild.length || !guild.filter(u => u !== null)) {
                response.statusCode = 500;
                return response.end(JSON.stringify({ success: false, body: "Server Error" }));
            }

            return response.end(JSON.stringify({ success: true, body: "Sync has been commissioned." }));
        } else if (type === "user") {
            const user = await this.client.shard.broadcastEval(`this.users.cache.get("${id}") ? this.users.cache.get("${id}").settings.sync(true) : null`)
                .catch(() => null);

            if (!user || !user.length || !user.filter(u => u !== null)) {
                response.statusCode = 500;
                return response.end(JSON.stringify({ success: false, body: "Server Error" }));
            }

            return response.end(JSON.stringify({ success: true, body: "Sync has been commissioned." }));
        } else {
            response.statusCode = 400;
            return response.end(JSON.stringify({ success: false, body: "Invalid Request" }));
        }
    }

};
