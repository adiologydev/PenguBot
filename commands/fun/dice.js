const { Command } = require("discord.js-commando");

module.exports = class DiceCMD extends Command {

    constructor(client) {
        super(client, {
            name: "roll",
            group: "fun",
            aliases: ["dice", "die"],
            memberName: "dice",
            description: "Rolls a custom sided die to give a random outcome.",
            usage: ["<prefix>roll <sides>"],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [{
                key: "sides",
                prompt: "How many sides should your die have?",
                type: "integer"
            }]
        });
    }

    async run(msg, { sides }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const num = Math.floor(Math.random() * sides) + 1;
        return msg.reply(`I rolled you a 🎲 of **${sides}** side(s) and got **${num}** as the outcome.`);
    }

};
