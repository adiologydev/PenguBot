const { Command, MessageEmbed } = require("../../index");
const { load } = require("cheerio");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["fuckmylife"],
            requiredPermissions: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_FML_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const html = await this.fetchURL("http://www.fmylife.com/random", { type: "text" });

        const $ = load(html);
        const article = $("article").find("a").first().text();

        return msg.sendEmbed(new MessageEmbed()
            .setDescription(`**F*ck My Life**\n${article}`)
            .setThumbnail("https://i.imgur.com/XW16vXq.png")
            .setColor("RANDOM"));
    }

};
