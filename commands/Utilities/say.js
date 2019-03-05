const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 5,
            permissionLevel: 4,
            requiredPermissions: ["MANAGE_MESSAGES", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_SAY_DESCRIPTION"),
            usage: "<message:string>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [message]) {
        if (message.length < 1) return msg.sendMessage("<:penguError:435712890884849664> Message length can't be less than one character.");
        msg.delete();
        return msg.sendMessage(message);
    }

};
