const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["savesong", "dmcurrentsong"],
            permissionLevel: 0,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_DMSONG_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
        this.Music = true;
    }

    async run(msg) {
        const music = msg.guild.music();
        const { queue } = music;
        if (!music.playing) return msg.sendMessage("<:penguError:435712890884849664> ***There's currently no music playing!***");

        const song = queue[0];
        const embed = new MessageEmbed()
            .setColor("#5bc0de")
            .setTitle("⏯ | Now Playing - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.cc")
            .setDescription([`• **Song:** ${song.title}`,
                `• **Author:** ${song.author}`,
                `• **Duration:** ${song.stream === true ? "Live Stream" : song.friendlyDuration}`,
                `• **Requested By:** ${song.requester}`,
                `• **Link:** ${song.url}`]);
        return msg.author.send({ embed: embed });
    }

};
