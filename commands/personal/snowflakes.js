const { Command } = require("discord.js-commando");

module.exports = class SnowflakesCMD extends Command {

    constructor(client) {
        super(client, {
            name: "snowflakes",
            group: "personal",
            memberName: "snowflakes",
            aliases: ["credits", "credit", "currency", "balance"],
            description: "Get how many Snowflakes you or someone else has.",
            usage: ["<prefix>snowflakes [tag a user]"],
            throttling: {
                usages: 1,
                duration: 3
            },
            /*             args: [{
                key: "user",
                prompt: "Who do you want Snowflakes for?\n",
                type: "user",
                default: ""
            }], */
            guildOnly: true
        });
    }

    async run(msg, { user }) { // eslint-disable-line
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        return msg.channel.send("❌ | This command is temporarily disabled because a Pengu tripped on a wire.");
        /* user = user || msg.author;
        const profile = this.client.settings.get(`${user.id}.profile`, { xp: 0, snowflakes: 0, daily: null, title: null, reps: 0, gaverep: false });
        if (!profile) await this.client.settings.set(`${user.id}.profile`, { xp: 0, snowflakes: 0, daily: null, title: null, reps: 0, gaverep: false });
        if (!profile.snowflakes) return msg.say(`❄ | **${user.username}** does not have any Snowflakes in their account, ask them to speak please!`);
        return msg.say(`❄ | **${user.username}** has **${profile.snowflakes}** Snowflakes in their account.`); */
    }

};
