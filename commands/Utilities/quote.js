const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 8,
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: msg => msg.language.get("COMMAND_QUOTE_DESCRIPTION"),
            usage: "<message:message>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [message]) {
        const embed = new MessageEmbed()
            .setColor(message.member.displayHexColor)
            .setDescription(`${message.content}`)
            .setTimestamp(message.createdAt)
            .setAuthor(message.author.tag, message.author.displayAvatarURL());
        return msg.sendEmbed(embed);
    }

};
