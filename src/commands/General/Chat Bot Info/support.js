const Command = require("../../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            guarded: true,
            requiredPermissions: ["EMBED_LINKS"],
            description: language => language.get("COMMAND_SUPPORT_DESCRIPTION")
        });
    }

    async run(msg) {
        return msg.send(msg.language.get("COMMAND_SUPPORT"));
    }

};
