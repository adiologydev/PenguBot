const { Route } = require("../index");

module.exports = class extends Route {

    constructor(...args) {
        super(...args, { route: "guild/:id" });
    }

    async get(request, response) {
        const { id } = request.params;
        if (!id) return response.end("No ID parameter passed");

        const guild = await this.client.shard.fetchGuild(id).catch(() => null);

        if (!guild) return response.end("Guild not found");
        return response.end(JSON.stringify(guild));
    }

};
