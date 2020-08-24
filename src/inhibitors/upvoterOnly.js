const { Inhibitor } = require("../index");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: false });
    }

    async run(msg, cmd) {
        if (!cmd.upvoteOnly) return;
        if (this.client.funcs.isUpvoter(msg.author) || this.client.funcs.isPatron(msg.guild)) return;
        throw `🔒 ***${msg.language.get("CMD_UPVOTE_ONLY")}***`;
    }

};
