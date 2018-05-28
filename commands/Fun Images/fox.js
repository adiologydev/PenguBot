const { Command } = require("klasa");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["foxy", "foxes"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: msg => msg.language.get("COMMAND_FOX_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { body } = await get("https://randomfox.ca/floof/");
        const embed = new MessageEmbed()
            .setFooter("© PenguBot.cc")
            .setTimestamp()
            .setColor("RANDOM")
            .setDescription(`**Fox Picture**`)
            .setImage(body.image);
        return msg.sendEmbed(embed);
    }

};
