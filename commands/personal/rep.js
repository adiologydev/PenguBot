const { Command } = require("discord.js-commando");

module.exports = class RepCMD extends Command {

    constructor(client) {
        super(client, {
            name: "rep",
            group: "personal",
            memberName: "rep",
            aliases: ["reputation", "giverep", "givereputation"],
            description: "Get free Snowflakes every 24 hours.",
            usage: ["<prefix>rep <user>"]
            /* ,
            args: [{
                key: "user",
                prompt: "Who do you want Rep?\n",
                type: "user"
            }] */
        });
    }

    async run(msg, { user }) { // eslint-disable-line
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        return msg.channel.send("❌ | This command is temporarily disabled because a Pengu tripped on a wire.");
        /* if (user.bot || msg.author.id === user.id) return msg.reply("You may not rep yourself or a bot. Sorry.");
        const profile = this.client.settings.get(`${msg.author.id}.profile`, { xp: 0, snowflakes: 0, daily: null, title: null, reps: 0, gaverep: false });
        if (!profile) await this.client.settings.set(`${msg.author.id}.profile`, { xp: 0, snowflakes: 0, daily: null, title: null, reps: 0, gaverep: false });

        if (profile.gaverep) {
            const d1 = Date.now();
            const d2 = profile.gaverep;
            const delta = d1 - d2;
            const countDown = 86400000 - delta;
            const hours = Math.floor(countDown / 3600000);
            const minutes = Math.floor((countDown / 60000) - (hours * 60));
            const seconds = (countDown / 1000) - ((hours * 3600) + (minutes * 60));
            const timeLeft = `**${hours} hours, ${minutes} minutes and ${Math.round(seconds)} seconds**`;

            if (delta >= 86400000) {
                await this.addRep(user);
                msg.reply(`🏆 | You've given a Reputation Point to **${user.tag}**!`);
                profile.gaverep = Date.now();
                await this.client.settings.set(`${msg.author.id}.profile`, profile);
            } else {
                msg.reply(`🏆 | You'll have to wait ${timeLeft} before giving someone a Reputation Point.`);
            }
        } else {
            await this.addRep(user);
            msg.reply(`🏆 | You've given a Reputation Point to **${user.tag}**!`);
            profile.gaverep = Date.now();
            await this.client.settings.set(`${msg.author.id}.profile`, profile);
        } */
    }

    async addRep(user) {
        const profile = this.client.settings.get(`${user.id}.profile`, { xp: 1, snowflakes: 1, daily: null, title: null, reps: 0, gaverep: false });
        if (!profile) await this.client.settings.set(`${user.id}.profile`, { xp: 1, snowflakes: 1, daily: null, title: null, reps: 0, gaverep: false });
        profile.reps += 1;
        return await this.client.settings.set(`${user.id}.profile`, profile);
    }

};
