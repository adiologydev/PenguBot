const { Monitor } = require("../index");

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { ignoreOthers: false });
    }

    async run(msg) {
        if (!msg.guild || !msg.channel.postable) return;

        if (this.client.user.id !== "303181184718995457" && await msg.guild.members.fetch("303181184718995457").catch(() => null)) return;

        if (msg.mentions.users.size) await this.afkMentioned(msg);
        if (msg.author.settings.afk.time) await this.checkAfk(msg);
    }

    async checkAfk(msg) {
        await msg.author.settings.reset("afk");

        const message = await msg.sendLocale("MONITOR_AFK_REMOVED", [msg.author.username]);
        return message.delete({ timeout: 10000, reason: "Pengubot AFK Feature" }).catch(() => null);
    }

    async afkMentioned(msg) {
        const mentioned = msg.mentions.users.first();
        const { afk } = mentioned.settings;

        if (afk.time) return msg.sendLocale("MONITOR_AFK_ISAFK", [mentioned.username, afk.reason, afk.time]);
    }

};
