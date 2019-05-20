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
        const findGuild = await this.client.shard.broadcastEval(`this.guilds.get("${request.body.id}")`);
        const guild = findGuild.find(g => g);
        if (!guild) return response.end("Guild not found");

        const updateGuild = await this.client.shard.broadcastEval(`if(this.guilds.get("${request.body.id}")) this.guilds.get("${request.body.id}").settings.update(${request.body.data}, { action: "overwrite" });`);
        const updated = updateGuild.find(g => g);
        if (!updated) return response.end("Guild not found");

        if (updated.errors.length) this.client.emit("error", `${guild.name}[${guild.id}] failed updating guild configs via dashboard with error:\n${inspect(updated.errors)}`);
        return response.end(RESPONSES.UPDATED[Number(!updated.errors.length)]);
    }

};
