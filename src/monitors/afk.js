const { Monitor } = require("../index");

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { ignoreOthers: false });
    }

    async run(msg) {
        if (!msg.guild || !msg.channel || !msg.channel.postable) return;

        if (msg.author.settings.get("afk.time")) await this.checkAfk(msg);
        if (msg.mentions.users.size) await this.afkMentioned(msg);
    }

    async checkAfk(msg) {
        await msg.author.settings.reset(["afk.time", "afk.reason"]);

        const message = await msg.sendLocale("MONITOR_AFK_REMOVED", [msg.author.username]);
        return message.delete({ timeout: 10000, reason: "Pengubot AFK Feature" }).catch(() => null);
    }

    async afkMentioned(msg) {
        const mentioned = msg.mentions.users.first();
        const afk = mentioned.settings.get("afk");

        if (!afk.time) return;

        return msg.sendLocale("MONITOR_AFK_ISAFK", [mentioned.username, afk.reason, afk.time]);
    }

};
