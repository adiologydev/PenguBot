const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const Song = require("../../util/musicBackend.js");

module.exports = class SaveQueueCommand extends Command {

    constructor(client) {
        super(client, {
            name: "dmsong",
            aliases: ["savesong", "dmcurrentsong"],
            group: "music",
            memberName: "dmqueue",
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
        const queue = this.queue.get(msg.guild.id);
        if (!queue || queue.playing === false) return msg.channel.send("There is nothing playing.");
        const song = queue.songs[0];
        const currentTime = queue.connection.dispatcher ? queue.connection.dispatcher.time / 1000 : 0;
        console.log(currentTime);
        const embed = new RichEmbed()
            .setColor(msg.guild.me.displayColor)
            .setTitle(song.title)
            .setThumbnail(song.image)
            .setDescription(`**Current Time:** ${song.timeString}\n**Time Left:** ${Song.timeLeft(parseInt(song.time), currentTime)}\n**Link:** ${song.url}\n**Channel Name:** ${song.channel.title}`);
        return msg.author.send({ embed }).catch(e => msg.reply(`You must have DM's disabled or you have blocked me 😢 ${e.message}`));
    }
    get queue() {
        if (!this._queue) this._queue = this.client.registry.resolveCommand("music:play").queue;
        return this._queue;
    }

};
