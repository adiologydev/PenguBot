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
    }

    async run(msg) {
        const queue = this.client.queue.get(msg.guild.id);
        const player = this.client.lavalink.get(msg.guild.id);
        if (!queue || !player) return msg.sendMessage("<:penguError:435712890884849664> ***There's currently no music playing!***");

        const song = queue.songs[0];
        const embed = new MessageEmbed()
            .setColor("#5bc0de")
            .setTitle("⏯ | Now Playing - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.cc")
            .setDescription([`• **Song:** ${song.name}`,
                `• **Author:** ${song.author}`,
                `• **Duration:** ${this.client.functions.friendlyTime(player.state.position)} / ${song.stream === true ? "Live Stream" : this.client.functions.friendlyTime(song.length)}`,
                `• **Requested By:** ${song.requester.tag}`,
                `• **Link:** ${song.url}`]);
        return msg.sendEmbed(embed);
    }

};
