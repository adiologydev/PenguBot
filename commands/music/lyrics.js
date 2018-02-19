const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const Lyricist = require("../../util/geniusLyrics.js"); // eslint-disable-line
const geniusLyrics = new Lyricist();

module.exports = class LyricsCommand extends Command {

    constructor(client) {
        super(client, {
            name: "lyrics",
            aliases: ["lyric", "songlyrics"],
            group: "music",
            memberName: "lyrics",
            description: "Get lyrics for any song in the world with Pengu.",
            details: "Get lyrics for any song in the whole world via Genius on PenguBot.",
            guildOnly: true,
            args: [{
                key: "song",
                prompt: "Please enter a song name you want lyrics for.\n",
                type: "string"
            }],
            throttling: {
                usages: 1,
                duration: 15
            }
        });
    }

    async run(msg, { song }) {
        const req = await geniusLyrics.request(`search?q=${song}`);
        const lyricdata = req.response.hits[0];
        if (!lyricdata) return msg.reply("The provided song could not be found. Please try again with a different one or contact us at <https://discord.gg/6KpTfqR>.");

        const picture = lyricdata.result.song_art_image_thumbnail_url;
        const extendedsong = lyricdata.result.title_with_featured;
        const artist = lyricdata.result.primary_artist.name;

        const lyricsbody = await geniusLyrics.scrapeLyrics(lyricdata.result.url);
        if (!lyricsbody) return msg.reply("The provided song's lyrics could not be found. Please try again with a different one or contact us at <https://discord.gg/6KpTfqR>.");

        const embed = new RichEmbed()
            .setAuthor(`${extendedsong} - ${artist} | Lyrics`, this.client.user.avatarURL, `http://genius.com/${lyricdata.result.path}`)
            .setColor("RANDOM")
            .setDescription(lyricsbody.length >= 1900 ? `${lyricsbody.substr(0, 1900)}...` : lyricsbody)
            .setThumbnail(picture)
            .setTimestamp()
            .setFooter(`PenguBot | Song Lyrics`, this.client.user.avatarURL);

        return msg.embed(embed);
    }

};
