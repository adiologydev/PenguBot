const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            guarded: true,
            requiredPermissions: ["EMBED_LINKS", "ATTACH_IMAGES"],
            description: (msg) => msg.language.get("COMMAND_UPVOTE_DESCRIPTION")
        });
    }

    async run(msg) {
        const embed = new MessageEmbed()
            .setDescription(msg.language.get("COMMAND_UPVOTE"))
            .setThumbnail("https://i.imgur.com/YxmvOHj.png")
            .setColor("RANDOM");
        return msg.sendEmbed(embed);
    }

};
