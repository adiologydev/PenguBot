const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: true });
    }

    async run(msg, cmd) {
        if (cmd.requireDJ !== true) return;
        if (msg.channel.type !== "text") throw "This command may be only executed in a server.";

        if (!msg.guild.settings.djOnly) return;
        if (await msg.hasAtLeastPermissionLevel(3)) return;
        throw msg.language.get("INHIBITOR_DJ_ONLY");
    }

};
