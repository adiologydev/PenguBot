const snekie = require("snekfetch");
const cheerio = require("cheerio");
const config = require("../../config"); // eslint-disable-line
const key = config.keys.music.lyrics;

class Util {

    /**
     * @since 2.0.1
     */
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

    /**
	 * Formats the given time into seconds
     * @since 2.0.1
	 * @param {number} ms the inputed duration to format
	 * @returns {string}
	 */
    static showSeconds(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString();
        const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
        return `​${hrs.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
    }

    /**
     * A function to format the result of the lyricsRequest function
     * @param {Object} req The object that is returnerned from the lyricsRequest function
     * @returns {Object}
     */
    async lyricsFormatter(req) {
        const lyricdata = req.response.hits[0];
        if (!lyricdata) throw "The provided song could not be found. Please try again with a different one or contact us at <https://discord.gg/u8WYw5r>.";

        const picture = lyricdata.result.song_art_image_thumbnail_url;
        const extendedsong = lyricdata.result.title_with_featured;
        const artist = lyricdata.result.primary_artist.name;

        const lyricsbody = await this.scrapeLyrics(lyricdata.result.url);
        if (!lyricsbody) throw "The provided song's lyrics could not be found. Please try again with a different one or contact us at <https://discord.gg/u8WYw5r>.";
        return {
            picture: picture,
            extendedSong: extendedsong,
            artist: artist,
            lyricsBody: lyricsbody
        };
    }

}

Util.lyricsRequest = async (path) => {
    const { body } = await snekie.get(`https://api.genius.com/${path}`)
        .set("Authorization", `Bearer ${key}`)
        .catch(err => {
            // Handle errors
            if (err.body.error) { throw new Error(`${err.body.error}: ${err.body.error_description}`); }
            if (err.body.meta.status !== 200) { throw new Error(`${err.body.meta.status}: ${err.body.meta.message}`); }
            throw err;
        });

    return body;
};

Util.scrapeLyrics = async (url) => {
    const { text } = await snekie.get(url);
    const $ = cheerio.load(text);
    if (!$(".lyrics")) return null;
    return $(".lyrics").text().trim();
};

module.exports = Util;
