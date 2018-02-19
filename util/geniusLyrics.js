const snekie = require("snekfetch");
const cheerio = require("cheerio");
const config = require("../config.json");
const keys = [config.lyrics.key1, config.lyrics.key2];
const apikey = keys[Math.floor(Math.random() * keys.length)];

module.exports = class Lyricist {

    async request(path) {
        // Fetch result and parse it as JSON
        const { body } = await snekie.get(`https://api.genius.com/${path}`)
            .set("Authorization", `Bearer ${apikey}`)
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
