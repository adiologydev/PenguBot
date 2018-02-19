const { Command } = require("discord.js-commando");
const answers = [
    "Maybe.", "Certainly not.",
    "I hope so.",
    "Not in your wildest dreams.",
    "There is a good chance.",
    "Quite likely.",
    "I think so.",
    "I hope not.",
    "I hope so.",
    "Never!",
    "Fuhgeddaboudit.",
    "Ahaha! Really?!?",
    "Pfft.",
    "Sorry, bucko.",
    "Hell, yes.",
    "Hell to the no.",
    "The future is bleak.",
    "The future is uncertain.",
    "I would rather not say.",
    "Who cares?",
    "Possibly.",
    "Never, ever, ever.",
    "There is a small chance.",
    "Yes!"];

module.exports = class EightBallCMD extends Command {

    constructor(client) {
        super(client, {
            name: "8ball",
            group: "fun",
            memberName: "8ball",
            description: "Basically what the 8Ball toy does.",
            usage: ["<prefix>8ball <question>"],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [{
                key: "question",
                prompt: "Please ask a question to be answered by 8Ball.",
                type: "string"
            }]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        msg.reply(`🎱 ${answers[Math.floor(Math.random() * answers.length)]}`).catch(err => console.log(err));
    }

};
