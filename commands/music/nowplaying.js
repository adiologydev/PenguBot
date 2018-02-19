const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const Song = require("../../util/musicBackend.js");

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
        const queue = this.queue.get(msg.guild.id);
        if (!queue || queue.playing === false) return msg.channel.send("There is nothing playing.");
        const song = queue.songs[0];
        const currentTime = queue.connection.dispatcher ? queue.connection.dispatcher.time / 1000 : 0;
        const embed = new RichEmbed()
            .setColor(msg.guild.me.displayColor)
            .setTitle(song.title)
            .setThumbnail(song.image)
            .setDescription(`**Current Time:** ${song.timeString}\n**Time Left:** ${Song.timeLeft(parseInt(song.time), currentTime)}\n**Link:** ${song.url}\n**Channel Name:** ${song.channel.title}`);
        return msg.channel.send({ embed });
    }
    get queue() {
        if (!this._queue) this._queue = this.client.registry.resolveCommand("music:play").queue;
        return this._queue;
    }

};
