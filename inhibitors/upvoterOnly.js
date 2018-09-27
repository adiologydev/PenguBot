const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: false });
    }

    async run(msg, cmd) {
        if (!cmd.upvoteOnly) return;
        if (this.client.funcs.isUpvoter(msg.author) || this.client.config.main.patreon) return;
        throw `${this.client.emotes.cross} ***${msg.language.get("CMD_UPVOTE_ONLY")}***`;
    }

};
