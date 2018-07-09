const { Monitor } = require("klasa");

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { ignoreOthers: false });
    }

    async run(msg) {
        if (!msg.guild || !msg.channel.postable || msg.author.id === this.client.user.id) return;

        if (this.client.user.id !== "303181184718995457") {
            const mainBot = await msg.guild.members.fetch("303181184718995457").catch(() => null);
            if (mainBot) return;
        }

        if (msg.mentions.users.size) {
            const mentioned = msg.mentions.users.first();
            if (mentioned.configs.afk.afk) {
                msg.sendMessage(`⏰ | ***${mentioned.tag} ${msg.language.get("MESSAGE_IS_AFK")}*** ${mentioned.configs.afk.reason}`);
            }
        }

        if (msg.author.configs.afk.afk) {
            await msg.author.configs.update(["afk.afk", "afk.reason"], [false, null]);
            const m = await msg.sendMessage(`<:penguError:435712890884849664> ***${msg.author.tag} ${msg.language.get("MESSAGE_AFK_REMOVED")}***`);
            await m.delete({ timeout: 10000 });
        }
    }

};
