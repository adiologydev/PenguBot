const Command = require("../../lib/structures/KlasaCommand");
const { get } = require("snekfetch");
const { load } = require("cheerio");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["fact", "rfact"],
            requiredPermissions: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_FACT_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        try {
            const { text } = await get("http://randomfactgenerator.net/").catch(() => msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("ER_CATS_DOGS")}***`));
            const $ = load(text);
            const article = $("#z").first().text().replace("\nTweet", "");

            const embed = new MessageEmbed()
                .setDescription(`**Random Fact**\n\n${article}`)
                .setThumbnail("https://i.imgur.com/fJiD9Jo.png")
                .setColor("RANDOM");
            return msg.sendMessage({ embed: embed });
        } catch (e) {
            return msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("ER_CATS_DOGS")}***`);
        }
    }

};
