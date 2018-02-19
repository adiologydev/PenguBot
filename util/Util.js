const snekie = require("snekfetch");
const config = require("../config.json");
class Util {

    async haste(input, extension) {
        extension = extension ? `.${extension}` : "";
        return new Promise(async (res, rej) => {
            if (!input) return rej("Input argument is required.");
            const { body: { key } } = await snekie.post("https://hastebin.com/documents").send(input).catch(e => rej(e));
            res(`https://hastebin.com/${key}${extension}`);
        });
    }

    isUpvoter(id) {
        return new Promise((res, rej) => {
            snekie.get(`https://discordbots.org/api/bots/303181184718995457/votes`)
                .set("Authorization", config.DBL)
                .then(r => res(r.body.map(c => c.id).includes(id))).catch(err => rej(err));
        });
    }

}

module.exports = Util;
