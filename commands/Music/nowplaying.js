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
            description: msg => msg.language.get("COMMAND_NOWPLAYING_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        const { queue } = music;
        if (!music.playing) return msg.sendMessage("<:penguError:435712890884849664> ***There's currently no music playing!***");

        const song = queue[0];
        const embed = new MessageEmbed()
            .setColor("#5bc0de")
            .setTitle("⏯ | Now Playing - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setDescription([`• **Title:** ${song.title}`,
                `• **Author:** ${song.author}`,
                `• **Duration:** ${song.stream === true ? "Live Stream" : song.friendlyDuration}`,
                `• **Requested By:** ${song.requester}`,
                `• **Link:** ${song.url}`]);
        return msg.sendEmbed({ embed: embed });
    }

};
