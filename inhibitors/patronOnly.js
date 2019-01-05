const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: false });
    }

    async run(msg, cmd) {
        if (!cmd.patronOnly) return;
        if (this.client.config.main.patreon) return;
        throw `🔒 ***${msg.language.get("CMD_PATRON_ONLY")}***`;
    }

};
