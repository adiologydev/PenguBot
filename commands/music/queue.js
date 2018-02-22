const { Command, util } = require("discord.js-commando");
const PAGINATED_ITEMS = 5;
const { RichEmbed } = require("discord.js");
const Utils = require("../../util/musicBackend.js");

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
                duration: 10
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
        const queue = this.client.queue.get(msg.guild.id);
        if (!queue) return msg.reply(":x: There are currently no songs in the Queue.");

        const paginated = util.paginate(queue.songs, page, Math.floor(PAGINATED_ITEMS));
        const totalLength = queue.songs.reduce((prev, song) => prev + song.time, 0);
        const currentSong = queue.songs[0];
        const embed = new RichEmbed()
            .setColor(3447003)
            .setAuthor(`PenguBot Music Queue | ${msg.author.tag}`, msg.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`__**Page ${paginated.page}**__
${paginated.items.map(song => `**-** ${!isNaN(song.id) ? `${song.name} (${song.readTime})` : `[${song.title}](${song.url})`} (${song.readTime})`).join("\n")}
${paginated.maxPage > 1 ? `\nUse ${msg.usage()} to view a specific page.\n` : ""}
**Now Playing:** ${!isNaN(currentSong.id) ? `${currentSong.title}` : `[${currentSong.title}](${currentSong.url})`}(${Utils.timeString(currentSong.time)})
**Total Queue Length:** ${Utils.timeString(totalLength)}
			`);
        return msg.embed(embed);
    }

};
