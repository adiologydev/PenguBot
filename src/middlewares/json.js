const { Middleware } = require("../index");
const zlib = require("zlib");

module.exports = class extends Middleware {

    constructor(...args) {
        super(...args, { priority: 20 });
    }

    async run(req) {
        if (req.method !== "POST") return;

        req.body = {};

        const stream = this.contentStream(req);
        let body = "";

        for await (const chunk of stream) body += chunk;

        try {
            req.body = JSON.parse(body);
        } catch (noop) {
            // Yeah nah
        }
    }

    contentStream(req) {
        const length = req.headers["content-length"];
        let stream;
        switch ((req.headers["content-encoding"] || "identity").toLowerCase()) {
            case "deflate":
                stream = zlib.createInflate();
                req.pipe(stream);
                break;
            case "gzip":
                stream = zlib.createGunzip();
                req.pipe(stream);
                break;
            case "identity":
                stream = req;
                stream.length = length;
                break;
        }
        return stream;
    }

};
