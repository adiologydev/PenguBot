const { Monitor } = require("klasa");

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { ignoreOthers: false });
    }

    async run(msg) {
        if (!msg.guild) return;
        if (!msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES"])) return;

        if (msg.author.id !== this.client.user.id) {
            if (msg.mentions.users.size) {
                const mentioned = msg.mentions.users.first();
                if (mentioned.configs.get("afk.afk")) {
                    msg.sendMessage(`⏰ | ***${mentioned.tag} ${msg.language.get("MESSAGE_IS_AFK")}*** ${mentioned.configs.get("afk.reason")}`);
                }
            }

            if (msg.author.configs.get("afk.afk")) {
                await msg.author.configs.update("afk.afk", false).then(() => {
                    msg.author.configs.update("afk.reason", null);
                });
                const m = await msg.sendMessage(`<:penguError:435712890884849664> ***${msg.author.tag} ${msg.language.get("MESSAGE_AFK_REMOVED")}***`);
                m.delete({ timeout: 10000 });
            }
        }
    }

};
