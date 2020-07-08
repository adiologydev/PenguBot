const { Command, MessageEmbed } = require("../../index");
const data = require("../../lib/constants/yomomma");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["yomoma", "yomommafat", "yomommasofat"],
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_MOMMA_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const joke = data[Math.floor(Math.random() * data.length)];
        return msg.sendEmbed(new MessageEmbed()
            .setDescription(`**Yo Momma Joke**\n\n${joke}`)
            .setThumbnail("https://i.imgur.com/ordRh9e.png")
            .setColor("RANDOM"));
    }

};
