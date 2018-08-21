const snekfetch = require("snekfetch");
const cheerio = require("cheerio");
const config = require("../../config");
const key = config.keys.music.lyrics;

class Lyrics {

    static async request(path) {
        return snekfetch.get(`https://api.genius.com/${path}`)
            .set("Authorization", `Bearer ${key}`)
            .then(res => res.body)
            .catch(error => {
                if (error.body.error) throw new Error(`${error.body.error}: ${error.body.error_description}`);
                if (error.body.meta.status !== 200) throw new Error(`${error.body.meta.status}: ${error.body.meta.message}`);
                throw error;
            });
    }

    static scrape(url) {
        return snekfetch.get(url).then(res => {
            const $ = cheerio.load(res.text);
            return $(".lyrics") ? $(".lyrics").text().trim() : null;
        });
    }

}

module.exports = Lyrics;
