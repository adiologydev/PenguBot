const Command = require("../../lib/structures/KlasaCommand");
const choices = ["rock", "paper", "scissors"];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["rockpaperscissors", "rpsgame"],
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_RPS_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<move:string>"
        });
    }

    async run(msg, [move]) {
        if (!move.match(/Rock|Paper|Scissors/i)) return msg.reply(`${msg.language.get("CMD_RPS_INVALID")} \`rock\`. \`paper\` or \`scissors\`.`);
        const outcome = choices[Math.floor(Math.random() * choices.length)];
        const choice = move.toLowerCase();
        if (choice === "rock") {
            if (outcome === "rock") return msg.reply("***Rock! That's a tie!***");
            if (outcome === "paper") return msg.reply("***Paper! I win, you lose!***");
            if (outcome === "scissors") return msg.reply("***Scissors! No! You won...***");
        }
        if (choice === "paper") {
            if (outcome === "rock") return msg.reply("***Rock! No! You won...***");
            if (outcome === "paper") return msg.reply("***Paper! Yeah! That's a tie!***");
            if (outcome === "scissors") return msg.reply("***Scissors! I win, you lose!***");
        }
        if (choice === "scissors") {
            if (outcome === "rock") return msg.reply("***Rock! I win, you lose!***");
            if (outcome === "paper") return msg.reply("***Paper! No! You won...***");
            if (outcome === "scissors") return msg.reply("***Scissors! Yeah! That's a tie!***");
        }
    }

};
