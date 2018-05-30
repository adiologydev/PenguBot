const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, {
            enabled: true,
            spamProtection: true
        });
    }

    async run(msg) {
        if (!msg.guild) return;
        if (!this.client.config.main.patreon) {
            if (msg.guild.members.has("438049470094114816")) throw true;
        }
    }

};
