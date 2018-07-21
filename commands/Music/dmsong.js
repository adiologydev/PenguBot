const MusicCommand = require("../../lib/structures/MusicCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 8,
            aliases: ["savesong", "dmcurrentsong"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: msg => msg.language.get("COMMAND_DMSONG_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        const { queue } = music;
        if (!music.playing) return msg.sendMessage("<:penguError:435712890884849664> ***There's currently no music playing!***");

        const [song] = queue;
        if (!song) return msg.sendMessage("<:penguError:435712890884849664> ***Song not found, please try with a different one.***");
        const embed = new MessageEmbed()
            .setColor("#5bc0de")
            .setTitle("⏯ | Now Playing - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setDescription(`• **Title:** ${song.title}
• **Author:** ${song.author}
• **Duration:** ${song.stream ? "Live Stream" : song.friendlyDuration}
• **Requested By:** ${song.requester}
• **Link:** ${song.url}`);
        return msg.author.send({ embed });
    }

};
