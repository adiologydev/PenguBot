const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["slm", "setleavemessage"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["messages.leave.message"],
            usage: "<message:string> [...]",
            usageDelim: " ",
            description: msg => msg.language.get("COMMAND_SET_LEAVE_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [...message]) {
        return msg.guild.configs.update("messages.leave.message", message.join(" ")).then(() => {
            msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_LEAVE_SET")}***`);
        });
    }

};
