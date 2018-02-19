const { Command } = require("discord.js-commando");


module.exports = class SnowflakesCMD extends Command {

    constructor(client) {
        super(client, {
            name: "daily",
            group: "personal",
            memberName: "daily",
            aliases: ["dailies", "getsnoflakes", "freesnowflakes"],
            description: "Get free Snowflakes every 24 hours.",
            usage: ["<prefix>daily"]
        });
    }


    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        return msg.channel.send("❌ | This command is temporarily disabled because a Pengu tripped on a wire.");
        /* const profile = this.client.settings.get(`${msg.author.id}.profile`, { xp: 1, snowflakes: 1, daily: null, title: null, reps: 0, gaverep: false });
        if (!profile) await this.client.settings.set(`${msg.author.id}.profile`, { xp: 1, snowflakes: 1, daily: null, title: null, reps: 0, gaverep: false });
        if (profile.daily) {
            const d1 = Date.now();
            const d2 = profile.daily;
            const delta = d1 - d2;
            const countDown = 86400000 - delta;
            const hours = Math.floor(countDown / 3600000);
            const minutes = Math.floor((countDown / 60000) - (hours * 60));
            const seconds = (countDown / 1000) - ((hours * 3600) + (minutes * 60));
            const timeLeft = `**${hours} hours, ${minutes} minutes and ${Math.round(seconds)} seconds**`;

            if (delta >= 86400000) {
                await this.addSnowflakes(msg.author, 500);
                msg.reply("❄ | You've been give **500** Snowflakes. Comeback tomorrow for more!");
                profile.daily = Date.now();
                await this.client.settings.set(`${msg.author.id}.profile`, profile);
            } else {
                msg.reply(`❄ | You'll have to wait ${timeLeft} before getting free Snowflakes.`);
            }
        } else {
            await this.addSnowflakes(msg.author, 500);
            msg.reply("❄ | You've been give **500** Snowflakes. Comeback tomorrow for more!");
            profile.daily = Date.now();
            await this.client.settings.set(`${msg.author.id}.profile`, profile);
        } */
    }

    async addSnowflakes(user, amount) {
        const profile = this.client.settings.get(`${user.id}.profile`, { xp: 1, snowflakes: 1, daily: null, title: null, reps: 0, gaverep: false });
        if (!profile) await this.client.settings.set(`${user.id}.profile`, { xp: 1, snowflakes: 1, daily: null, title: null, reps: 0, gaverep: false });
        profile.snowflakes += amount;
        return await this.client.settings.set(`${user.id}.profile`, profile);
    }

};
