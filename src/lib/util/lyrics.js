const { util: { fetch }, config } = require("../../index");
const cheerio = require("cheerio");
const key = config.apis.lyrics;

class Lyrics {

    static async request(path) {
        return fetch(`https://api.genius.com/${path}`, { headers: { Authorization: `Bearer ${key}` } })
            .catch(error => {
                if (error.body.error) throw new Error(`${error.body.error}: ${error.body.error_description}`);
                throw error;
            });
    }

    static async scrape(url) {
        const data = await fetch(url, "text");
        const $ = cheerio.load(data);
        const lyrics = $(".lyrics");
        return lyrics ? lyrics.text().trim() : null;
    }

}

module.exports = Lyrics;
