const { MusicCommand, MessageEmbed } = require("../../index");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["savesong", "dmcurrentsong"],
            description: language => language.get("COMMAND_DMSONG_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        if (!music.playing) return msg.sendMessage(msg.language.get("MUSIC_NOT_PLAYING"));

        const [song] = music.queue;
        if (!song) return msg.sendMessage(msg.language.get("MUSIC_NO_SONGS_IN_QUEUE"));

        const embed = new MessageEmbed()
            .setColor("#5bc0de")
            .setTitle("⏯ | Now Playing - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setDescription(`
• **Title:** ${song.title}
• **Author:** ${song.author}
• **Duration:** ${song.friendlyDuration}
• **Requested By:** ${song.requester}
• **Link:** ${song.url}`);

        return msg.author.sendEmbed(embed).catch(() => { throw msg.language.get("ER_NO_DM"); });
    }

};
