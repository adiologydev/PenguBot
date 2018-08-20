const { Command } = require("klasa");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            aliases: ["youtubestats"],
            cooldown: 5,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_YTSTATS_DESCRIPTION"),
            usage: "<name:string>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [name]) {
        const snippet = await get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${this.client.config.keys.music.youtube}&maxResults=1&type=channel`)
            .catch(e => msg.reply(`<:penguError:435712890884849664> Your channel was too powerful that I couldn't handle it, try again! Error: ${e}`));
        if (!snippet.body.items[0]) return msg.reply(msg.language.get("ER_TRY_AGAIN"));

        const data = await get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${snippet.body.items[0].id.channelId}&key=${this.client.config.keys.music.youtube}`)
            .catch(e => msg.reply(`<:penguError:435712890884849664> Your channel was too powerful that I couldn't handle it, try again! Error: ${e}`));

        const embed = new MessageEmbed()
            .setColor("#ea5655")
            .setAuthor("YouTube Channel Statistics", "https://i.imgur.com/1sLSPUr.png")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setThumbnail(snippet.body.items[0].snippet.thumbnails.high.url)
            .setDescription(`❯ **Channel Name:** ${snippet.body.items[0].snippet.channelTitle}
❯ **Channel Description:** ${snippet.body.items[0].snippet.description}\n
❯ **Subscribers Count:** ${parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString()}
❯ **Total Views:** ${parseInt(data.body.items[0].statistics.viewCount).toLocaleString()}
❯ **Total Videos:** ${parseInt(data.body.items[0].statistics.videoCount).toLocaleString()}
❯ **Channel Created:** ${new Date(snippet.body.items[0].snippet.publishedAt).toDateString()}\n
❯ **Link:** [YouTube.com/${snippet.body.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${snippet.body.items[0].id.channelId})`);
        return msg.sendEmbed(embed);
    }

};
