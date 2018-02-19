const { Command } = require("discord.js-commando");
module.exports = class RockPaperScissors extends Command {

    constructor(client) {
        super(client, {
            name: "rps",
            memberName: "rps",
            group: "fun",
            description: "Play rock-paper-scissors with the bot.",
            examples: ["rps rock"],
            usage: ["<prefix>rps"],
            args: [{
                key: "move",
                prompt: "What move would you like to take?\n",
                type: "string",
                validate: text => {
                    if (text.match(/Rock|Paper|Scissors/i)) return true;
                    return "That wasn't a valid move.\n";
                }
            }]
        });
    }

    async run(msg, { move }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
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
                return msg.channel.send(`You chose **${choice1}**,\n\nI chose **${choice2}**. It's a tie!`);
            }
            if (choice1.match(/Rock/i)) {
                if (choice2 === "scissors") {
                    return msg.channel.send(`You chose **${choice1}**,\n\nI chose **${choice2}**. Rock wins!`);
                } else {
                    return msg.channel.send(`You chose **${choice1}**,\n\nI chose **${choice2}**. Paper wins!`);
                }
            }
            if (choice1.match(/Paper/i)) {
                if (choice2 === "rock") {
                    return msg.channel.send(`You chose **${choice1}**,\n\nI chose **${choice2}**. Paper wins!`);
                } else {
                    return msg.channel.send(`You chose **${choice1}**,\n\nI chose **${choice2}**. Scissors win!`);
                }
            }
            if (choice1.match(/Scissors/i)) {
                if (choice2 === "rock") {
                    return msg.channel.send(`You chose **${choice1}**,\n\nI chose **${choice2}**. Rock wins!`);
                } else {
                    return msg.channel.send(`You chose **${choice1}**,\n\nI chose **${choice2}**. Scissors win!`);
                }
            }
        }
        compare(move, botChoice);
    }

};
