const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");
const cheerio = require("cheerio");
module.exports = class RandomComicCommand extends Command {

    constructor(client) {
        super(client, {
            name: "randomcomic",
            aliases: ["comic"],
            group: "fun",
            memberName: "randomcomic",
            description: "Grab a random comic picture.",
            throttling: {
                usages: 1,
                duration: 3
            },
            examples: ["<prefix>randomcomic"]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const link = "http://explosm.net/rcg/";
        const { text } = await get(link).catch(() => msg.say("There was an error, I think a cat has cut the wire off, dogs don't do that."));
        const $ = cheerio.load(text);
        return msg.reply("Here's a Random Comic For You! :)", { file: `http:${$("#rcg-comic").first().find("img").first().attr("src").replace(/\\/g, "/")}` });
    }

};
