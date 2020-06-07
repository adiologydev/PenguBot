const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: true });
    }

    async run(msg, cmd) {
        if (!msg.guild.settings.get("disabledCommandsGroup").includes(cmd.category.toLowerCase())) return;
        throw msg.sendMessage(`${msg.language.get("INHIBITOR_DISABLED_GROUP")}: \`${cmd.category}\``);
    }

};
