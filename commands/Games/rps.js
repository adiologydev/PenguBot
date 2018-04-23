const { Command } = require("klasa");
const choices = ["rock", "paper", "scissors"];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["rockpaperscissors", "rpsgame"],
            botPerms: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_RPS_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<move:string>"
        });
    }

    async run(msg, [move]) {
        if (!move.match(/Rock|Paper|Scissors/i)) return msg.reply("That's an invalid move, please choose `rock`. `paper` or `scissors`.");
        const outcome = choices[Math.floor(Math.random() * choices.length)];
        const choice = move.toLowerCase();
        if (choice === "rock") {
            if (outcome === "rock") return msg.reply("***Rock! That's a tie!***");
            if (outcome === "paper") return msg.reply("***Paper! I win, you don't!***");
            if (outcome === "scissors") return msg.reply("***Scissors! No! I lost...***");
        }
        if (choice === "paper") {
            if (outcome === "rock") return msg.reply("***Rock! No! I lost...***");
            if (outcome === "paper") return msg.reply("***Paper! That's a tie!***");
            if (outcome === "scissors") return msg.reply("***Scissors! I win, you don't!***");
        }
        if (choice === "scissors") {
            if (outcome === "rock") return msg.reply("***Rock! I win, you don't!***");
            if (outcome === "paper") return msg.reply("***Paper! No! I lost...***");
            if (outcome === "scissors") return msg.reply("***Scissors! That's a tie!***");
        }
    }

};
