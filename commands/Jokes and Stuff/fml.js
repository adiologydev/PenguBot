const { Command } = require("klasa");
const { get } = require("snekfetch");
const { parse } = require("fast-html-parser");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["fuckmylife"],
            botPerms: ["SEND_MESSAGES", "ATTACH_IMAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_FML_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { text: html } = await get("http://www.fmylife.com/random");
        const root = parse(html);
        const article = root.querySelector(".block a");

        const embed = new this.client.methods.Embed()
            .setDescription(`**F*ck My Life**\n${article.text}`)
            .setThumbnail("https://i.imgur.com/XW16vXq.png")
            .setColor("RANDOM");
        return msg.channel.send({ embed: embed });
    }

};
