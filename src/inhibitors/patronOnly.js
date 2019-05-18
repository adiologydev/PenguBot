const { Inhibitor, config } = require("../index");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: false });
    }

    async run(msg, cmd) {
        if (!cmd.patronOnly || config.patreon) return;
        throw `🔒 ***${msg.language.get("CMD_PATRON_ONLY")}***`;
    }

};
