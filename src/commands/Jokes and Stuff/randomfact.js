const { Command, MessageEmbed } = require("../../index");
const facts = require("../../lib/constants/facts.json");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["fact", "rfact"],
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_FACT_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        return msg.sendEmbed(new MessageEmbed()
            .setDescription(`**Random Fact**\n\n${facts[Math.floor(Math.random() * facts.length)]}`)
            .setThumbnail("https://i.imgur.com/fJiD9Jo.png")
            .setColor("RANDOM"));
    }

};
