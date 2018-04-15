const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            botPerms: ["SEND_MESSAGES"],
            description: (msg) => msg.language.get("COMMAND_DICE_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<sides:number>"
        });
    }

    async run(msg, [sides]) {
        const num = Math.floor(Math.random() * sides) + 1;
        msg.channel.send(msg.language.get("COMMAND_DICE", sides, num));
    }

};
