const Command = require("../../lib/structures/KlasaCommand");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["yomoma", "yomommafat", "yomommasofat"],
            requiredPermissions: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_MOMMA_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { text } = await get(`http://api.yomomma.info`).catch(() => msg.sendMessage("There was an error, I think a cat has cut the wire off, dogs don't do that."));

        const embed = new MessageEmbed()
            .setDescription(`**Yo Momma Joke**\n\n${JSON.parse(text).joke}`)
            .setThumbnail("https://i.imgur.com/ordRh9e.png")
            .setColor("RANDOM");
        return msg.sendMessage({ embed: embed });
    }

};
