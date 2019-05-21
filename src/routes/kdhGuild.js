const { Route } = require("../index");

module.exports = class extends Route {

    constructor(...args) {
        super(...args, { route: "guild/:id" });
    }

    async get(request, response) {
        const { id } = request.params;
        if (!id) return response.status(200).json({ error: "No ID parameter passed" });

        const guild = await this.client.shard.fetchGuild(id).catch(() => null);

        if (!guild) return response.status(200).json({ error: "Guild not found" });
        return response.status(200).json(guild);
    }

};
