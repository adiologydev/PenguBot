const { Command, MessageEmbed } = require("../../index");
const { parse } = require("node-html-parser");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["fuckmylife"],
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_FML_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const res = await this.fetchURL("http://www.fmylife.com/random", { type: "text" })
            .catch(() => null);
        if (!res) throw `${this.client.emotes.cross} ***${msg.language.get("ER_CATS_DOGS")}***`;

        const root = parse(res);
        const article = root.querySelector(".article-link").text;

        return msg.sendEmbed(new MessageEmbed()
            .setDescription(`**F*ck My Life**\n${article}`)
            .setThumbnail("https://i.imgur.com/XW16vXq.png")
            .setColor("RANDOM"));
    }

};
