const { Route, constants: { RESPONSES } } = require("klasa-dashboard-hooks");
const { inspect } = require("util");

module.exports = class extends Route {

    constructor(...args) {
        super(...args, {
            route: "oauth/user/guilds",
            authenticated: true
        });
    }

    async post(request, response) {
        const guildExists = await this.client.shard.fetchGuild(request.body.id).catch(() => null);
        if (!guildExists) return response.status(200).json({ error: "Guild not found" });

        const updateGuild = await this.client.shard.broadcastEval(`if(this.guilds.get("${request.body.id}")) this.guilds.get("${request.body.id}").settings.update(${request.body.data}, { action: "overwrite" });`);
        const updated = updateGuild.find(g => g);
        if (!updated) return response.status(200).json({ error: "Guild not found" });

        if (updated.errors.length) this.client.emit("error", `${guildExists.name}[${guildExists.id}] failed updating guild configs via dashboard with error:\n${inspect(updated.errors)}`);
        return response.end(RESPONSES.UPDATED[Number(!updated.errors.length)]);
    }

};
