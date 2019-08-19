const { Middleware } = require("../index");

module.exports = class extends Middleware {

    constructor(...args) {
        super(...args, { priority: 10 });
    }

    run(req, res) {
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "*");

        const matches = /msie\s*(\d+)/i.exec(req.headers["user-agent"]);
        res.setHeader("X-XSS-Protection", !matches || (Number(matches[1]) >= 9) ? "1; mode=block" : "0");

        if (req.method === "OPTIONS") return res.end("Something");

        res.setHeader("Content-Type", "application/json");
        return undefined;
    }

};
