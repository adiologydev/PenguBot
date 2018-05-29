const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["tpg"],
            permissionLevel: 10,
            usage: "<guild:string>",
            description: msg => msg.language.get("COMMAND_TPG_DESCRIPTION")
        });
    }

    async run(msg, [guild]) {
        const exists = this.client.configs.pGuilds.includes(guild);
        await this.client.configs.update("pGuilds", guild);
        return msg.sendMessage(`${exists ? "**Removed Guild:**" : "**Added Guild:**"} ${guild}`);
    }

    async init() {
        if (!this.client.gateways.clientStorage.schema.has("pGuilds")) {
            this.client.gateways.clientStorage.schema.add("pGuilds", { type: "string", array: true, configurable: false });
        }
    }

};
