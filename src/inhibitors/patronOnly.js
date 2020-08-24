const { Inhibitor } = require("../index");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: false });
    }

    async run(msg, cmd) {
        if (!cmd.patronOnly || this.client.funcs.isPatron(msg.guild)) return;
        throw `🔒 ***${msg.language.get("CMD_PATRON_ONLY")}***`;
    }

};
