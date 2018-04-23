const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            guarded: true,
            botPerms: ["EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_SUPPORT_DESCRIPTION")
        });
    }

    async run(msg) {
        return msg.send(msg.language.get("COMMAND_SUPPORT"));
    }

};
