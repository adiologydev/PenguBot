const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js"); //eslint-disable-line 

module.exports = class ProfileCMD extends Command {

    constructor(client) {
        super(client, {
            name: "profile",
            group: "personal",
            memberName: "profile",
            aliases: ["globalprofile", "getprofile"],
            description: "Get your profile or someone else's profile.",
            usage: ["<prefix>profile [tag a user]"],
            throttling: {
                usages: 1,
                duration: 3
            },
            /*             args: [{
                key: "user",
                prompt: "Who's Profile would you like to see?\n",
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

        const level = Math.floor((1 / Math.sqrt(80)) * Math.sqrt(profile.xp)) || 0;
        const xp = profile.xp || 0;
        const snf = profile.snowflakes || 0;
        const title = profile.title || "Default Title. Pls set me to something";
        const reputation = profile.reps || 0;

        const embed = new RichEmbed()
            .setAuthor(`User Profile: ${user.username}`, user.avatarURL)
            .setDescription(`**• User**: ${user.tag} (${user.id})
**• Title**: ${title}

**• Reputation(s)**: ${reputation}
**• Level**: ${level}
**• Experience Points**: ${xp}
**• Snowflake(s)**: ${snf}`)
            .setThumbnail(user.avatarURL)
            .setTimestamp()
            .setFooter("© PenguBot")
            .setColor(msg.guild.me.displayColor);

        return msg.embed(embed);*/
    }

};
