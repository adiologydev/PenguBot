const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["tpg"],
            permissionLevel: 10,
            usage: "<guild:guild>",
            description: (msg) => msg.language.get("COMMAND_TPG_DESCRIPTION")
        });
    }

    async run(msg, [guild]) {
        if (this.client.configs.pGuilds.find(g => g === guild.id)) {
            this.client.configs.update("pGuilds", guild, { action: "remove" });
            msg.reply(`**Removed Guild:** ${guild.name} (${guild.id})`);
        } else {
            this.client.configs.update("pGuilds", guild, { action: "add" });
            msg.reply(`**Added Guild:** ${guild.name} (${guild.id})`);
        }
    }

    async init() {
        if (!this.client.gateways.clientStorage.schema.has("pGuilds")) {
            this.client.gateways.clientStorage.schema.add("pGuilds", { type: "guild", array: true, configurable: false });
        }
    }

};
