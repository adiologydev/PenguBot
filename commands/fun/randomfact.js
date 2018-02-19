const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");
const { parse } = require("fast-html-parser");

module.exports = class RandomFactCMD extends Command {

    constructor(client) {
        super(client, {
            name: "randomfact",
            group: "fun",
            aliases: ["fact", "rfact"],
            memberName: "randomfact",
            description: "Grabs a random amazing fact for you.",
            throttling: {
                usages: 1,
                duration: 3
            },
            usage: ["<prefix>randomfact"]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { text } = await get("http://randomfactgenerator.net/").catch(() => msg.say("There was an error, I think a cat has cut the wire off, dogs don't do that."));
        const root = parse(text);
        const article = root.querySelector("#z");
        return msg.reply(`Random fact: ${article.childNodes[0].rawText}`);
    }

};
