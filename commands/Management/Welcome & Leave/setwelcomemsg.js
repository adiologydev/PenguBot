const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            bucket: 1,
            aliases: ["swm", "setwelcomemmessage"],
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
        return msg.guild.configs.update("welcome-text", message.join(" ")).then(() => {
            msg.channel.send(`<:penguCheck1:431440099675209738> ***${msg.language.get("MESSAGE_WELCOME_SET")}***`);
        });
    }

};
