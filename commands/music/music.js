const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class MusicHelpCMD extends Command {

    constructor(client) {
        super(client, {
            name: "music",
            group: "music",
            memberName: "music",
            aliases: ["musichelp", "m", "mh"],
            guildOnly: true,
            description: "Know how to use Music commands with Pengu.",
            usage: ["<prefix>music"]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const musichelp = new Discord.RichEmbed()
            .setAuthor("Music - PenguBot", this.client.user.avatarURL)
            .setColor(0x00AE86)
            .setFooter("© PenguBot", this.client.user.avatarURL)
            .setTimestamp()
            .addField(`**Command Prefix:** ${msg.guild.commandPrefix} | Example: ${msg.guild.commandPrefix}play 2U - David Guetta`, "\u200B")
            .addField("- play <url> or <song name>", "Plays a requested song in your voice channel.")
            .addField("- stop", "Stops the currently playing music and clears the queue. Requires DJPengu-Bot or Administrator Role")
            .addField("- skip", "Skip the current song instantly if there are 3 or less people in the voice channel. It does a vote skip if there are more people. Requires DJPengu-Bot or Administrator Role.") // eslint-disable-line max-len
            .addField("- pause", "Pause the currently playing music. Requires DJPengu-Bot or Administrator Role.")
            .addField("- resume", "Resume the paused music. Requires DJPengu-Bot or Administrator Role")
            .addField("- queue", "Tells you which all songs are in the queue with more information.")
            .addField("- lyrics", "Enter a song name and get lyrics for it on the go easily with Pengu.")
            .addField("- nowplaying", "Get information about the currently playing song.")
            .addField("- dmsong", "Direct Messages you the information about the currently playing song.")
            .addField("\u200B", 'Note: This feature does go through constant development mostly all the time. If you have bugs, please report them on our support server "p!invite" for link.')
            .addField("Support PenguBot, Become a Patreon", "Want to get access to exclusive features before they're even released to others? Consider becoming a Patreon today: [Patreon](https://www.patreon.com/pengubot)"); // eslint-disable-line max-len
        return msg.embed(musichelp);
    }

};
