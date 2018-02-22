const { Command } = require("discord.js-commando");

module.exports = class SaveQueueCommand extends Command {

    constructor(client) {
        super(client, {
            name: "dmsong",
            aliases: ["savesong", "dmcurrentsong"],
            group: "music",
            memberName: "dmsong",
            description: "Direct Message You The Current Queue of Music.",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const queue = this.client.queue.get(msg.guild.id);
        if (!queue || queue.playing === false) return msg.channel.send("There is nothing playing.");
        const song = queue.songs[0];
        msg.author.send(`🎵 | **PenguBot Song Saver:** ${song.title} (${song.readTime}) by ${song.author} | ${song.url}`);
    }

};
