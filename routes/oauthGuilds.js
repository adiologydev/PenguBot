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
        const guildArray = await this.client.shard.broadcastEval(`this.guilds.get(${request.body.id}`);
        const botGuild = guildArray.filter(guild => guild);
        const updated = await botGuild[0].settings.update(request.body.data, { action: "overwrite" });
        const errored = Boolean(updated.errors.length);

        if (errored) this.client.emit("error", `${botGuild[0].name}[${botGuild[0].id}] failed updating guild configs via dashboard with error:\n${inspect(updated.errors)}`);

        return response.end(RESPONSES.UPDATED[Number(!errored)]);
    }

};
