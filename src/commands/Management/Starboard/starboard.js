const { Command, MessageEmbed } = require("../../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["star"],
            permissionLevel: 5,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "<Message:message>",
            description: language => language.get("COMMAND_STAR_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [Message]) {
        const starChannel = msg.guild.channels.cache.find(c => c.id === msg.guild.settings.get("starboard.channel"));
        if (!starChannel || !starChannel.postable) return msg.reply("I do not have permissions to send Embeds in Starboard channel or Channel not found.");
        if (!starChannel.nsfw && msg.channel.nsfw) return msg.reply("This message is from an NSFW channel while your Starboard Channel is SFW, I can't send it there sorry!");
        const fetch = await starChannel.messages.fetch({ limit: 100 });
        const starMsg = fetch.find(m => m.embeds[0] && m.embeds[0].footer && m.embeds[0].footer.text.startsWith("⭐") && m.embeds[0].footer.text.endsWith(Message.id));

        const jumpString = `[► View The Original Message](https://discordapp.com/channels/${Message.guild.id}/${Message.channel.id}/${Message.id})\n`;

        if (starMsg) {
            const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(starMsg.embeds[0].footer.text); // eslint-disable-line
            const starEmbed = starMsg.embeds[0];
            const image = Message.attachments.size > 0 ? await this.checkAttachments(Message.attachments.array()[0].url) : null;
            const embed = new MessageEmbed()
                .setColor(starEmbed.color)
                .setAuthor(`${Message.author.tag} in #${Message.channel.name}`, Message.author.displayAvatarURL())
                .setTimestamp(new Date(Message.createdTimestamp))
                .setFooter(`⭐ ${Message.reactions.cache.get("⭐").count} | ${msg.id}`);
            if (image) embed.setImage(image);
            if (starEmbed.description) embed.setDescription(`${jumpString}${starEmbed.description}`);
            else embed.setDescription(jumpString);
            const oldMsg = await starChannel.messages.fetch(starMsg.id);
            await oldMsg.edit({ embed });
        } else {
            const image = Message.attachments.size > 0 ? await this.checkAttachments(Message.attachments.array()[0].url) : null;
            if (!image && Message.content.length < 1) return msg.reply("Can not star an Empty Message.");
            await Message.react("⭐");
            const embed = new MessageEmbed()
                .setColor(15844367)
                .setAuthor(`${Message.author.tag} in #${Message.channel.name}`, Message.author.displayAvatarURL())
                .setTimestamp(new Date(Message.createdTimestamp))
                .setFooter(`⭐ ${Message.reactions.cache.get("⭐").count} | ${Message.id}`);
            if (image) embed.setImage(image);
            if (Message.content) embed.setDescription(`${jumpString}${Message.content}`);
            await starChannel.send({ embed });
        }
    }

    checkAttachments(attachment) {
        const imageLink = attachment.split(".");
        const typeOfImage = imageLink[imageLink.length - 1];
        const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
        if (!image) return null;
        return attachment;
    }

};
