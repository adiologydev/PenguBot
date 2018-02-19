const { Command, util } = require("discord.js-commando");
const PAGINATED_ITEMS = 5;
const Song = require("../../util/musicBackend.js");
const { RichEmbed } = require("discord.js");
module.exports = class ViewQueueCommand extends Command {

    constructor(client) {
        super(client, {
            name: "queue",
            aliases: ["songs", "songsqueue"],
            group: "music",
            memberName: "queue",
            description: "Get detailed information about the queue.",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 3
            },

            args: [{
                key: "page",
                prompt: "what page would you like to view?\n",
                type: "integer",
                default: 1
            }]
        });
    }

    async run(msg, { page }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const queue = this.queue.get(msg.guild.id);
        if (!queue) return msg.reply(":x: There are currently no songs in the Queue.");

        const paginated = util.paginate(queue.songs, page, Math.floor(PAGINATED_ITEMS));
        const totalLength = queue.songs.reduce((prev, song) => prev + song.time, 0);
        const currentSong = queue.songs[0];
        const currentTime = queue.connection.dispatcher ? queue.connection.dispatcher.time / 1000 : 0;
        const embed = new RichEmbed()
            .setColor(3447003)
            .setAuthor(`PenguBot Music Queue | ${msg.author.tag}`, msg.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`__**Song queue, page ${paginated.page}**__
${paginated.items.map(song => `**-** ${!isNaN(song.id) ? `${song.name} (${song.timeString})` : `[${song.title}](${song.url})`} (${song.timeString})`).join("\n")}
${paginated.maxPage > 1 ? `\nUse ${msg.usage()} to view a specific page.\n` : ""}
**Now playing:** ${!isNaN(currentSong.id) ? `${currentSong.title}` : `[${currentSong.title}](${currentSong.url})`}
**Progress:** ${!queue.playing ? "Paused: " : ""}${Song.timeString(currentTime)} / ${Song.timeString(currentSong.time)}(${Song.timeLeft(currentSong.time, currentTime)} left)
**Total queue time:** ${Song.timeString(totalLength)}
			`);
        return msg.embed(embed);
    }

    get queue() {
        if (!this._queue) this._queue = this.client.registry.resolveCommand("music:play").queue;
        return this._queue;
    }

};
