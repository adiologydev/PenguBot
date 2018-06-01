const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: true });
    }

    async run(msg, cmd) {
        if (!msg.guildConfigs.disabledCommandsGroup.includes(cmd.category)) return;
        throw msg.language.get("INHIBITOR_DISABLED_GROUP");
    }

};
