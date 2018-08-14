const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["swm", "setwelcomemmessage"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "<message:string> [...]",
            usageDelim: " ",
            description: language => language.get("COMMAND_SET_WELCOME_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [...message]) {
        return msg.guild.settings.update("messages.welcome.message", message.join(" ")).then(() => {
            msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_WELCOME_SET")}***`);
        });
    }

};
