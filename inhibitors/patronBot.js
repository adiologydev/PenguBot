const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: true });
    }

    async run(msg) {
        const member = await msg.guild.members.fetch("438049470094114816").catch(() => null);
        if (member) {
            throw true;
        }
    }

    async init() {
        if (this.client.config.main.patreon) return this.disable();
    }

};
