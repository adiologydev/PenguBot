const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["np", "currentsong", "song"],
            permissionLevel: 0,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_NOWPLAYING_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
        this.Music = true;
    }

    async run(msg) {
        const { music } = msg.guild;
        if (!music.playing) return msg.sendMessage("<:penguError:435712890884849664> ***There's currently no music playing!***");
        if (!music.queue.length) throw "<:penguError:435712890884849664> ***There are no songs in queue!***";

        const song = music.queue[0];
        const embed = new MessageEmbed()
            .setColor("#5bc0de")
            .setTitle("⏯ | Now Playing - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.cc")
            .setDescription([`• **Song:** ${song.trackTitle}`,
                `• **Author:** ${song.author}`,
                `• **Duration:** ${song.stream === true ? "Live Stream" : song.trackFriendlyDuration}`,
                `• **Requested By:** ${song.requester.tag}`,
                `• **Link:** ${song.trackURL}`]);
        return msg.sendEmbed(embed);
    }

};
