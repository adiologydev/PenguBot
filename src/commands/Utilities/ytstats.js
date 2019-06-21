const { Command, Timestamp, MessageEmbed, config } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 25,
            aliases: ["ytstats", "youtubesubs", "youtubeinfo", "ytinfo"],
            requiredPermissions: ["EMBED_LINKS"],
            description: "Get youTube channel statisitcs directly from youTube.",
            usage: "<channel:url|channel:string>",
            extendedHelp: "No extended help available."
        });

        this.timestamp = new Timestamp("d MMMM YYYY");
    }

    async run(msg, [channel]) {
        const { items: [channelInfo] } = await this.fetchURL("https://www.googleapis.com/youtube/v3/search",
            { query: { part: "snippet", q: channel, key: config.apis.google, maxResults: 1, type: "channel" } })
            .catch(() => { throw "I'm having trouble communicating with youtube, make sure you entered the right channel."; });

        if (!channelInfo) return msg.sendMessage("I could not find that channel, make sure the channel name is entered correctly.");

        const { items: [channelStats] } = await this.fetchURL("https://www.googleapis.com/youtube/v3/channels",
            { query: { part: "snippet,contentDetails,statistics,brandingSettings", id: channelInfo.id.channelId, key: config.apis.google } })
            .catch(() => { throw "I'm having trouble communicating with youtube, make sure you entered the right channel."; });

        if (!channelStats) return msg.sendMessage("I could not find information about that channel. Make sure the channel name is entered correctly.");

        return msg.sendEmbed(new MessageEmbed()
            .setFooter("YouTube Channel Statistics")
            .setTimestamp()
            .setColor("#1976D2")
            .setAuthor(channelInfo.snippet.channelTitle, channelInfo.snippet.thumbnails.high.url, `https://www.youtube.com/channel/${channelInfo.id.channelId}`)
            .setDescription(`**Channel Description:** ${channelInfo.snippet.description}`)
            .addField("Subsciber Count:", Number(channelStats.statistics.subscriberCount).toLocaleString(), true)
            .addField("View Count:", Number(channelStats.statistics.viewCount).toLocaleString(), true)
            .addField("Video Count:", Number(channelStats.statistics.videoCount).toLocaleString(), true)
            .addField("Created At:", this.timestamp.display(channelInfo.snippet.publishedAt), true)
            .setThumbnail(channelInfo.snippet.thumbnails.high.url));
    }

};
