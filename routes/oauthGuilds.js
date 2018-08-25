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
        const guildArray = await this.client.shard.broadcastEval(`this.guilds.get(${request.body.id})`);
        const botGuild = guildArray.find(guild => guild);
        const updated = await this.client.shard.broadcastEval(`
        const guild = this.guilds.get('${request.body.id}');
        if (guild) guild.settings.update(${request.body.data}, { action: "overwrite" });`);

        const errored = Boolean(updated.find(some => some).errors.length);
        if (errored) this.client.emit("error", `${botGuild.name}[${botGuild.id}] failed updating guild configs via dashboard with error:\n${inspect(updated.errors)}`);
        return response.end(RESPONSES.UPDATED[Number(!errored)]);
    }

};
