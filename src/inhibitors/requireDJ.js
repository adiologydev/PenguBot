const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: true });
    }

    async run(msg, cmd) {
        if (cmd.requireDJ !== true) return;
        if (msg.channel.type !== "text") throw "This command may be only executed in a server.";

        if (!msg.guild.settings.get("toggles.djmode")) return;
        if (await msg.hasAtLeastPermissionLevel(2)) return;
        throw `${this.client.emotes.cross} ***${msg.language.get("INHIBITOR_DJ_ONLY")}***`;
    }

};
