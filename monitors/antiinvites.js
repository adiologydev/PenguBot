const { Monitor } = require("klasa");

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            enabled: true,
            ignoreSelf: true
        });
    }

    async run(msg) {
        if (!msg.guild || !msg.guild.configs.get("anti-invite")) return null;
        if (await msg.hasAtLeastPermissionLevel(4)) return null;
        if (!/(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(msg.content)) return null;
        return msg.delete()
            .catch(err => this.client.emit("log", err, "error"));
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("anti-invite")) {
            await this.client.gateways.guilds.schema.add("anti-invite", { type: "boolean", default: false });
        }
    }

};
