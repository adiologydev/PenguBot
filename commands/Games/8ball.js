const { Command } = require("klasa");
const answers = [
    "Maybe.", "Certainly not.", "I hope so.", "Not in your wildest dreams.",
    "There is a good chance.", "Quite likely.", "I think so.",
    "I hope not.", "I hope so.", "Never!", "Fuhgeddaboudit.",
    "Ahaha! Really?!?", "Pfft.", "Sorry, bucko.",
    "Hell, yes.", "Hell to the no.", "The future is bleak.",
    "The future is uncertain.", "I would rather not say.", "Who cares?",
    "Possibly.", "Never, ever, ever.", "There is a small chance.", "Yes!"];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["yesorno"],
            description: msg => msg.language.get("COMMAND_8BALL_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<question:string>"
        });
    }

    async run(msg) {
        return msg.reply(`🎱 ${answers[Math.floor(Math.random() * answers.length)]}`);
    }

};
