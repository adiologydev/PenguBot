const { Middleware } = require("klasa-api");

module.exports = class extends Middleware {

    constructor(...args) {
        super(...args, { priority: 10 });
    }

    run(request, response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT");
        response.setHeader("Access-Control-Allow-Headers", "Authorization, User-Agent, Content-Type");
        if (request.method === "OPTIONS") return response.end("Something");
        response.setHeader("Content-Type", "application/json");
        return undefined;
    }

};
