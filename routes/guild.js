const { Route } = require("klasa-dashboard-hooks");

module.exports = class extends Route {

    constructor(...args) {
        super(...args, { route: "guild/:id" });
    }

    async get(request, response) {
        const { id } = request.params;
        if (!id) return response.end("No ID parameter passed");

        const guildArray = await this.client.shard.broadcastEval(`this.guilds.get("${id}")`);
        const foundGuild = guildArray.find(guild => guild);

        if (!foundGuild) return response.end("Guild not found");
        return response.end(JSON.stringify(foundGuild));
    }

};
