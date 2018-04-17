const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            bucket: 1,
            aliases: ["slm", "setleavemessage"],
            permLevel: 6,
            botPerms: ["SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["welcome-text"],
            usage: "<message:string> [...]",
            usageDelim: " ",
            description: (msg) => msg.language.get("COMMAND_SET_WELCOME_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [...message]) {
        return msg.guild.configs.update("leave-text", message.join(" ")).then(() => {
            msg.channel.send(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_LEAVE_SET")}***`);
        });
    }

};
