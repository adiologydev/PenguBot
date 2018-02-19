const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");
const { RichEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = class YTStatsCMD extends Command {

    constructor(client) {
        super(client, {
            name: "ytstats",
            group: "utilities",
            aliases: ["youtubestats", "youtubesubs", "youtubeinfo", "ytinfo"],
            memberName: "ytstats",
            description: "Get YouTube Channel Statisitcs Directly From YouTube.",
            usage: ["<prefix>ytstats <channel name or URL>"],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                key: "ytname",
                prompt: "Please enter a YouTube Channel Name or URL?\n",
                type: "string"
            }]
        });
    }
    async run(msg, { ytname }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { GOOGLE_API: APIKey } = this.client.config;
        try {
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${ytname}&key=${APIKey}&maxResults=1&type=channel`;
            const a = await get(url).then(res => res.body).catch(e => msg.reply(e));
            const url2 = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${a.items[0].id.channelId}&key=${APIKey}`;
            const subcount = await get(url2).then(res => res.body).catch(e => msg.reply(e));
            const embed = new RichEmbed()
                .setFooter("YouTube Channel Statistics - PenguBot")
                .setTimestamp()
                .setColor("#ea5655")
                .setAuthor(a.items[0].snippet.channelTitle, a.items[0].snippet.thumbnails.high.url, `https://www.youtube.com/channel/${a.items[0].id.channelId}`)
                .setDescription(`**Channel Description:** ${a.items[0].snippet.description}`)
                .addField("Subsciber Count:", parseInt(subcount.items[0].statistics.subscriberCount).toLocaleString(), true)
                .addField("View Count:", parseInt(subcount.items[0].statistics.viewCount).toLocaleString(), true)
                .addField("Video Count:", parseInt(subcount.items[0].statistics.videoCount).toLocaleString(), true)
                .addField("Created At:", moment(a.items[0].snippet.publishedAt).format("dddd, MMMM Do YYYY"), true)
                .setThumbnail(a.items[0].snippet.thumbnails.high.url);
            return msg.embed(embed);
        } catch (e) {
            return msg.reply("❌ There was an error, please try again with a valid URL or Channel Name.");
        }
    }

};
