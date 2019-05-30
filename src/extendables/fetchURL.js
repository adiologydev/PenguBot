const { Extendable, Piece, Util: { fetch } } = require("../index");

module.exports = class extends Extendable {

    constructor(...args) {
        super(...args, { appliesTo: [Piece] });
    }

    fetchURL(url, options = {}) {
        options.headers = options.headers ? { ...options.headers, "User-Agent": this.client.userAgent } : { "User-Agent": this.client.userAgent };
        return fetch(url, options, options.type || "json").catch(error => {
            Error.captureStackTrace(error);
            this.client.emit("error", error);
            throw error;
        });
    }

};
