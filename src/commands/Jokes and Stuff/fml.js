const Command = require("../../lib/structures/KlasaCommand");
const { get } = require("snekfetch");
const { load } = require("cheerio");
const { MessageEmbed } = require("discord.js");

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
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["VIEW_CHANNEL"])) return;
        const { text: html } = await get("http://www.fmylife.com/random").catch(e => {
            Error.captureStackTrace(e);
            return e;
        });
        const $ = load(html);
        const article = $("p").find("a").first().text();

        const embed = new MessageEmbed()
            .setDescription(`**F*ck My Life**\n${article}`)
            .setThumbnail("https://i.imgur.com/XW16vXq.png")
            .setColor("RANDOM");
        return msg.sendMessage({ embed: embed });
    }

};
