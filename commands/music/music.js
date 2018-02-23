const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class MusicHelpCMD extends Command {

    constructor(client) {
        super(client, {
            name: "music",
            group: "music",
            memberName: "music",
            aliases: ["musichelp", "m", "mh"],
            throttling: {
                usages: 1,
                duration: 60
            },
            guildOnly: true,
            description: "Know how to use Music commands with Pengu.",
            usage: ["<prefix>music"]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const musichelp = new Discord.RichEmbed()
            .setAuthor("🎵 PenguBot Music 🎵", this.client.user.avatarURL)
            .setColor("RANDOM")
            .setFooter("© PenguBot", this.client.user.avatarURL)
            .setTimestamp()
            .setDescription("Now enjoy music right on your Discord Guild with PenguBot Music, powered with extreme backend technology where performance is not compromised.")
            .addField(`\`>\` ${msg.guild.commandPrefix}play`, "For Song Selector Use: `p!play <Song Name>`, For Playlists, YouTube Video URLs, Soundcloud URLs, Live Streams, etc. use `p!play <URL>` for SoundCloud Search or YouTube Search use: `p!play <ytsearch|scsearch>:<song name>`.") // eslint-disable-line max-len
            .addField(`\`>\` ${msg.guild.commandPrefix}stop`, "Stops the music and clears the queue. Requires `DJPengu-Bot` or `Administrator Role`.")
            .addField(`\`>\` ${msg.guild.commandPrefix}skip`, "Skip the current song instantly if there are 3 or less people in the voice channel. It does a vote skip if there are more people. Requires `DJPengu-Bot` or `Administrator Role`.")
            .addField(`\`>\` ${msg.guild.commandPrefix}pause`, "Pause the music. Requires `DJPengu-Bot` or `Administrator Role`. PATRON ONLY")
            .addField(`\`>\` ${msg.guild.commandPrefix}resume`, "Resume the paused music. Requires `DJPengu-Bot` or `Administrator Role`. PATRON ONLY")
            .addField(`\`>\` ${msg.guild.commandPrefix}queue`, "Tells you which all songs are in the queue with more information.")
            .addField(`\`>\` ${msg.guild.commandPrefix}lyrics`, "Enter a song name and get lyrics for it on the go easily.")
            .addField(`\`>\` ${msg.guild.commandPrefix}nowplaying`, "Get information about the currently playing song.")
            .addField(`\`>\` ${msg.guild.commandPrefix}dmsong`, "Direct Messages you the information about the currently playing song.")
            .addField("\u200B", `**Support PenguBot, Become a Patron**\nWant to get access to exclusive features while supporting PenguBot? Consider becoming a Patron today: [Patreon](https://www.patreon.com/PenguBot)\n\n**Note:** This feature does go through constant development mostly all the time. If you have bugs, please report them on our support server \`${msg.guild.commandPrefix}invite\` for link.`); // eslint-disable-line max-len
        return msg.embed(musichelp);
    }

};
