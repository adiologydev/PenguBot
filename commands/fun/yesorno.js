const { Command } = require("discord.js-commando");

module.exports = class YesOrNoCMD extends Command {

    constructor(client) {
        super(client, {
            name: "ask",
            group: "fun",
            aliases: ["yesorno"],
            memberName: "ask",
            description: "Ask a question and get Yes or No in reply to help you make up your decesion.",
            usage: ["<prefix>ask <question>"],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: "text",
                prompt: "Give me a question to be answered with YES or NO.\n",
                type: "string"
            }]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const yesno = ["My Pengu senses says **YES!**", "I have a feeling that I should say **NO**!"];
        const randn = yesno[Math.floor(Math.random() * yesno.length)];
        return msg.reply(randn);
    }

};
