const { Command, MessageEmbed } = require("../../index");

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
        const data = await this.fetchURL("https://uselessfacts.jsph.pl/random.json");

        return msg.sendEmbed(new MessageEmbed()
            .setDescription(`**Random Fact**\n\n${data.text}`)
            .setThumbnail("https://i.imgur.com/fJiD9Jo.png")
            .setColor("RANDOM"));
    }

};
