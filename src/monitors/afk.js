const { Monitor } = require("../index");

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { ignoreOthers: false });
    }

    async run(msg) {
        if (!msg.guild || !msg.channel.postable || msg.author.id === this.client.user.id) return;

        if (this.client.user.id !== "303181184718995457" && await msg.guild.members.fetch("303181184718995457").catch(() => null)) return;

        if (msg.mentions.users.size) {
            const mentioned = msg.mentions.users.first();
            if (mentioned.settings.afk.afk) {
                msg.sendMessage(`⏰ | ***${mentioned.tag} ${msg.language.get("MESSAGE_IS_AFK")}*** ${mentioned.settings.afk.reason}`);
            }
        }

        if (msg.author.settings.afk.afk) {
            await msg.author.settings.update([["afk.afk", false], ["afk.reason", null]]);
            const m = await msg.sendMessage(`<:penguError:435712890884849664> ***${msg.author.tag} ${msg.language.get("MESSAGE_AFK_REMOVED")}***`);
            await m.delete({ timeout: 10000 });
        }
    }

};
