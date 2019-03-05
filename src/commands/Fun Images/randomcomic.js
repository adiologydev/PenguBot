const Command = require("../../lib/structures/KlasaCommand");
const { get } = require("snekfetch");
const cheerio = require("cheerio");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["comic", "comics"],
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_COMIC_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        try {
            const { text } = await get("http://explosm.net/rcg/").catch(() => msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("ER_CATS_DOGS")}***`));
            const $ = cheerio.load(text);

            const embed = new MessageEmbed()
                .setFooter("© PenguBot.com")
                .setTimestamp()
                .setColor("RANDOM")
                .setDescription(`**Random Comic**`)
                .setImage(`http:${$("#rcg-comic").first().find("img").first().attr("src").replace(/\\/g, "/")}`);
            return msg.sendEmbed(embed);
        } catch (e) {
            return msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("ER_CATS_DOGS")}***`);
        }
    }

};
