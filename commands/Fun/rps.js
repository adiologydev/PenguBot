const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["cats", "catfact"],
            botPerms: ["SEND_MESSAGES"],
            description: (msg) => msg.language.get("COMMAND_RPS_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<move:string>"
        });
    }

    async run(msg, [move]) {
        let botChoice = Math.random();
        if (botChoice < 0.34) {
            botChoice = "rock";
        } else if (botChoice <= 0.67) {
            botChoice = "paper";
        } else {
            botChoice = "scissors";
        }

        function compare(choice1, choice2) {
            if (choice1 === choice2) {
                return msg.channel.send(msg.language.get("COMMAND_RPS_TIE", choice1, choice2));
            } else if (choice1.match(/Rock/i)) {
                if (choice2 === "scissors") {
                    return msg.channel.send(msg.language.get("COMMAND_RPS_ROCK", choice1, choice2));
                } else {
                    return msg.channel.send(msg.language.get("COMMAND_RPS_PAPER", choice1, choice2));
                }
            } else if (choice1.match(/Paper/i)) {
                if (choice2 === "rock") {
                    return msg.channel.send(msg.language.get("COMMAND_RPS_PAPER", choice1, choice2));
                } else {
                    return msg.channel.send(msg.language.get("COMMAND_RPS_SCISSORS", choice1, choice2));
                }
            } else if (choice1.match(/Scissors/i)) {
                if (choice2 === "rock") {
                    return msg.channel.send(msg.language.get("COMMAND_RPS_ROCK", choice1, choice2));
                } else {
                    return msg.channel.send(msg.language.get("COMMAND_RPS_SCISSORS", choice1, choice2));
                }
            } else { msg.channel.send(msg.language.get("COMMAND_RPS_INVALID_MOVE", move)); }
        }
        compare(move, botChoice);
    }

};
