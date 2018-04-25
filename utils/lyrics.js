const snekie = require("snekfetch");
const cheerio = require("cheerio");
const config = require("../config");
const key = config.keys.music.lyrics;

module.exports = class Lyricist {

    async request(path) {
        // Fetch result and parse it as JSON
        const { body } = await snekie.get(`https://api.genius.com/${path}`)
            .set("Authorization", `Bearer ${key}`)
            .catch(err => {
                // Handle errors
                if (err.body.error) { throw new Error(`${err.body.error}: ${err.body.error_description}`); }
                if (err.body.meta.status !== 200) { throw new Error(`${err.body.meta.status}: ${err.body.meta.message}`); }
                throw err;
            });

        return body;
    }

    async scrapeLyrics(url) {
        const { text } = await snekie.get(url);
        const $ = cheerio.load(text);
        if (!$(".lyrics")) return null;
        return $(".lyrics").text().trim();
    }

};
