const fetch = require("node-fetch");

class Util {

    static haste(data, extension = "js") {
        return Util.fetch("https://paste.pengubot.com/documents", { method: "post", body: data })
            .then(body => `https://paste.pengubot.com/${body.key}.${extension}`)
            .catch(error => error.statusText ? error.statusText : error.message);
    }

    static showSeconds(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString();
        const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
        return `${hrs.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
    }

    static async fetch(url, options, type) {
        if (typeof options === "undefined") {
            options = {};
            type = "json";
        } else if (typeof options === "string") {
            type = options;
            options = {};
        } else if (typeof type === "undefined") {
            type = "json";
        }

        const query = new URLSearchParams(options.query || {});

        url = `${url}?${query}`;

        const result = await fetch(url, options);
        if (!result.ok) throw new Error(`${url} - ${result.status}`);

        switch (type) {
            case "result": return result;
            case "buffer": return result.buffer();
            case "json": return result.json();
            case "text": return result.text();
            default: throw new Error(`Unknown type ${type}`);
        }
    }

}

module.exports = Util;
