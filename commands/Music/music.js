const MusicCommand = require("../../lib/structures/MusicCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["np", "currentsong", "song"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: msg => msg.language.get("COMMAND_MUSIC_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const prefix = msg.guild.configs.get("prefix");
        const embed = new MessageEmbed()
            .setColor("#91c3d2")
            .setTitle("🎵 | Music Help - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setDescription("Now enjoy music right on your Discord Guild with PenguBot Music, powered with extreme backend technology where performance is not compromised.")
            .addField(`• ${prefix}play`, "For Song Selector Use: `p!play <Song Name>`, For Playlists, YouTube Video URLs, Soundcloud URLs, Live Streams, etc. use `p!play <URL>`, for SoundCloud Search or YouTube Search use: `p!play <ytsearch|scsearch>:<song name>`.") // eslint-disable-line max-len
            .addField(`• ${prefix}stop`, "Stops the music and clears the queue. Requires `Pengu-DJ` or above.")
            .addField(`• ${prefix}skip`, "Skip the current song instantly if there are 3 or less people in the voice channel. It does a vote skip if there are more people. Requires `Pengu-DJ` or above.")
            .addField(`• ${prefix}pause`, "Pause the music. Requires Requires `Pengu-DJ` or above. PATRON ONLY")
            .addField(`• ${prefix}resume`, "Resume the paused music. Requires Requires `Pengu-DJ` or above. PATRON ONLY")
            .addField(`• ${prefix}queue`, "Tells you which all songs are in the queue with more information.")
            .addField(`• ${prefix}lyrics`, "Enter a song name and get lyrics for it on the go easily.")
            .addField(`• ${prefix}nowplaying`, "Get information about the currently playing song.")
            .addField(`• ${prefix}dmsong`, "Direct Messages you the information about the currently playing song.")
            .addField(`• ${prefix}createdj`, "Tag a user to make them admin, requires Pengu-Mod or above.")
            .addField(`• ${prefix}loop`, "Loop a song to repeat everytime it finishes.")
            .addField(`• ${prefix}toggledj`, "Allow Pengu-Mod and above to make music commands Pengu-DJ Mode only.")
            .addField(`• ${prefix}shuffle`, "Shuffle the song queue to randomize it.")
            .addField(`• ${prefix}volume`, "Change Volume of PenguBot in Voice Channel.")
            .addField("\u200B", `**Support PenguBot, Become a Patron**\nWant to get access to exclusive features while supporting PenguBot? Consider becoming a Patron today: [Patreon](https://www.patreon.com/PenguBot)\n\n**Note:** This feature does go through constant development mostly all the time. If you have bugs, please report them on our support server \`${prefix}support\` for link.`); // eslint-disable-line max-len

        return msg.sendEmbed(embed);
    }

};
