const { Monitor } = require("klasa");

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { ignoreOthers: false });
    }

    async run(msg) {
        if (msg.author.id !== this.client.user.id) {
            if (!msg.guild) return;
            if (msg.mentions.users.size) {
                const mentioned = msg.mentions.users.first();
                if (mentioned.configs.get("afk")) {
                    msg.channel.send(`⏰ | ***${mentioned.tag} ${msg.language.get("MESSAGE_IS_AFK")}*** ${mentioned.configs.get("afk-reason")}`);
                }
            }

            if (msg.author.configs.get("afk")) {
                await msg.author.configs.update("afk", false).then(() => {
                    msg.author.configs.update("afk-reason", null);
                });
                const m = await msg.channel.send(`<:penguCross:432966551746904071> ***${msg.author.tag} ${msg.language.get("MESSAGE_AFK_REMOVED")}***`);
                m.delete({ timeout: 5000 });
            }
        }
    }

};
