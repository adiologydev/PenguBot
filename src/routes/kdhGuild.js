const { Route } = require("../index");

module.exports = class extends Route {

    constructor(...args) {
        super(...args, { route: "guild/:id" });
    }

    async get(request, response) {
        const { id } = request.params;
        if (!id) {
            response.statusCode = 400;
            return response.end(JSON.stringify({ message: "No id provided" }));
        }

        const guild = await this.client.shard.fetchGuild(id)
            .catch(() => null);

        if (!guild) {
            response.statusCode = 404;
            return response.end(JSON.stringify({ message: "Guild not found" }));
        }

        response.statusCode = 200;
        return response.end(JSON.stringify(guild));
    }

};
