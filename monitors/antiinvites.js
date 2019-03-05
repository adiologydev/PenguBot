const { Monitor } = require("klasa");
const inviteRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/;

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { ignoreBots: false,
            ignoreSelf: true,
            ignoreOthers: false });
    }

    async run(msg) {
        if (!msg.guild || !msg.guild.settings.automod.invites) return;

        if (this.client.user.id !== "303181184718995457") {
            const mainBot = await msg.guild.members.fetch("303181184718995457").catch(() => null);
            if (mainBot) return;
        }

        if (await msg.hasAtLeastPermissionLevel(4)) return;
        if (!inviteRegex.test(msg.content)) return;
        return msg.delete().catch(err => this.client.emit("log", err, "error"));
    }

};
