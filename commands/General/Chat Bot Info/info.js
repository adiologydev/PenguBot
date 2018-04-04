const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["details", "what"],
            guarded: true,
            botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_INFO_DESCRIPTION")
        });
    }

    async run(msg) {
        return msg.sendMessage(msg.language.get("COMMAND_INFO"));
    }

};
