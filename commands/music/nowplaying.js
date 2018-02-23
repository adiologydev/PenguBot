const { Command } = require("discord.js-commando");

module.exports = class NowPlayingCommand extends Command {

    constructor(client) {
        super(client, {
            name: "nowplaying",
            aliases: ["currentsong", "song", "np"],
            group: "music",
            memberName: "nowplaying",
            description: "Show information about the current music which is playing.",
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
        return msg.channel.send(`➡ | **Currently Playing:** ${song.title} by ${song.author} - ${song.url}`);
    }

};
