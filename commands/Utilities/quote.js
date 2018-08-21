const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 8,
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_QUOTE_DESCRIPTION"),
            usage: "<message:message>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [message]) {
        const image = msg.attachments.size > 0 ? await this.checkAttachments(msg.attachments.array()[0].url) : null;
        const embed = new MessageEmbed()
            .setColor("#FAFAFA")
            .setDescription(`${message.content}`)
            .setTimestamp(message.createdAt)
            .setAuthor(message.author.tag, message.author.displayAvatarURL());
        if (image) embed.setImage(image);
        return msg.sendEmbed(embed);
    }

    checkAttachments(attachment) {
        const imageLink = attachment.split(".");
        const typeOfImage = imageLink[imageLink.length - 1];
        const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
        if (!image) return null;
        return attachment;
    }

};
