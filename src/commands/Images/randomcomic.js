const { Command, MessageEmbed } = require("../../index");
const cheerio = require("cheerio");

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
        const { text } = await this.fetchURL("http://explosm.net/rcg/", { type: "text" })
            .catch(() => { throw `${this.client.emotes.cross} ***${msg.language.get("ER_CATS_DOGS")}***`; });
        const $ = cheerio.load(text);

        return msg.sendEmbed(new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setColor("RANDOM")
            .setDescription(`**Random Comic**`)
            .setImage(`http:${$("#rcg-comic").first().find("img").first().attr("src").replace(/\\/g, "/")}`));
    }

};
