const { Monitor } = require("klasa");

const timeout = new Set();

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            ignoreBots: true,
            ignoreSelf: true,
            ignoreOthers: false
        });
    }

    async run(msg) {
        if (!msg.guild) return;
        if (timeout.has(`${msg.author.id}-${msg.guild.id}`)) return;

        if (this.client.user.id !== "303181184718995457") {
            const mainBot = await msg.guild.members.fetch("303181184718995457").catch(() => null);
            if (mainBot) return;
        }

        await msg.member.settings.sync(true);
        if (!msg.member.settings) return;

        const randomXP = this.client.funcs.randomNumber(1, 5);
        const newXP = msg.member.settings.xp + randomXP;
        const newLvl = Math.floor(0.2 * Math.sqrt(newXP));
        await msg.member.settings.update([["xp", newXP], ["level", newLvl]]);

        timeout.add(`${msg.author.id}-${msg.guild.id}`);
        setTimeout(() => timeout.delete(`${msg.author.id}-${msg.guild.id}`), 45000);
    }

};
