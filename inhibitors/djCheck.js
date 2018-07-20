const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: true });
    }

    async run(msg, cmd) {
        if (!msg.guild) return;
        if (msg.guild.configs.djOnly) {
            if (cmd.options.requireMusic) {
                if (!msg.hasAtLeastPermissionLevel(3)) {
                    throw msg.language.get("INHIBITOR_DJ_ONLY");
                }
            }
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("djOnly")) {
            this.client.gateways.guilds.schema.add("djOnly", { type: "boolean", default: false });
        }
    }

};
