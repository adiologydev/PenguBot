const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["ask"],
            botPerms: ["SEND_MESSAGES"],
            description: (msg) => msg.language.get("COMMAND_YESORNO_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<question:string>"
        });
    }

    async run(msg, [question]) {
        const yesno = ["**YES!**", "**NO**!"];
        const randn = yesno[Math.floor(Math.random() * yesno.length)];
        return msg.channel.send(msg.language.get("COMMAND_YESORNO", question, randn));
    }

};
