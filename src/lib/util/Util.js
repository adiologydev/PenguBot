const fetch = require("node-fetch");

class Util {

    static toCodePoint(unicode) {
        const parts = [];
        let c = 0, p = 0, i = 0;
        while (i < unicode.length) {
            c = unicode.charCodeAt(i++);
            if (p) {
                parts.push((0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00)).toString(16)); // eslint-disable-line no-bitwise
                p = 0;
            } else if (c >= 0xD800 && c <= 0xDBFF) {
                p = c;
            } else {
                parts.push(c.toString(16));
            }
        }
        return parts.join("-");
    }

    static haste(data, extension = "js") {
        return Util.fetch("https://paste.pengubot.com/documents", { method: "post", body: data })
            .then(body => `https://paste.pengubot.com/${body.key}.${extension}`);
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
