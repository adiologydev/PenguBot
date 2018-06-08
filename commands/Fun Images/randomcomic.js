const { Command } = require("klasa");
const { get } = require("snekfetch");
const cheerio = require("cheerio");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["comic", "comics"],
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: msg => msg.language.get("COMMAND_COMIC_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { text } = await get("http://explosm.net/rcg/").catch(() => msg.sendMessage("There was an error, I think a cat has cut the wire off, dogs don't do that."));
        const $ = cheerio.load(text);

        const embed = new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setColor("RANDOM")
            .setDescription(`**Random Comic**`)
            .setImage(`http:${$("#rcg-comic").first().find("img").first().attr("src").replace(/\\/g, "/")}`);
        return msg.sendEmbed(embed);
    }

};
