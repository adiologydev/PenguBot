const MusicCommand = require("../../lib/structures/MusicCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["np", "currentsong", "song"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_NOWPLAYING_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        const { queue } = music;
        if (!music.playing) return msg.sendMessage(`${this.client.emotes.cross} ***There's currently no music playing!***`);

        const [song] = queue;
        if (!song) return msg.sendMessage(`${this.client.emotes.cross} ***Song not found, please try with a different one.***`);
        const embed = new MessageEmbed()
            .setColor("#5bc0de")
            .setTitle("⏯ | Now Playing - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setDescription(`• **Title:** ${song.title}
• **Author:** ${song.author}
• **Duration:** ${song.friendlyDuration}
• **Requested By:** ${song.requester}
• **Link:** ${song.url}`);
        return msg.sendEmbed(embed);
    }

};
