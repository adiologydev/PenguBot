const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");
const { parse } = require("fast-html-parser");
module.exports = class FMLCMD extends Command {

    constructor(client) {
        super(client, {
            name: "fml",
            group: "fun",
            aliases: ["fuckmylife"],
            memberName: "fml",
            throttling: {
                usages: 1,
                duration: 10
            },
            description: "Grabs a random FML Joke for you.",
            usage: ["<prefix>fml"]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { text: html } = await get("http://www.fmylife.com/random");
        const root = parse(html);
        const article = root.querySelector(".block a");
        return msg.reply(`Here is your FML Joke: ${article.text}`);
    }

};
