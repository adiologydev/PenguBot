const { Command, MessageEmbed } = require("../../index");

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
        const { joke } = await this.fetchURL("http://api.yomomma.info");

        return msg.sendEmbed(new MessageEmbed()
            .setDescription(`**Yo Momma Joke**\n\n${joke}`)
            .setThumbnail("https://i.imgur.com/ordRh9e.png")
            .setColor("RANDOM"));
    }

};
