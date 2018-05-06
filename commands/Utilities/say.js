const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 5,
            permissionLevel: 4,
            requiredPermissions: ["MANAGE_MESSAGES", "USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_SAY_DESCRIPTION"),
            usage: "<message:string> [...]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [...message]) {
        msg.delete();
        return msg.channel.send(message.join(" "));
    }

};
