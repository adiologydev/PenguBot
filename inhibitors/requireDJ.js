const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: true });
    }

    async run(msg, cmd) {
        if (cmd.requireDJ !== true) return;
        if (msg.channel.type !== "text") throw "This command may be only executed in a server.";

        if (!msg.guild.configs.djOnly) return;
        if (await msg.hasAtLeastPermissionLevel(3)) return;
        throw msg.language.get("INHIBITOR_DJ_ONLY");
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("djOnly")) {
            this.client.gateways.guilds.schema.add("djOnly", { type: "boolean", default: false });
        }
    }

};
