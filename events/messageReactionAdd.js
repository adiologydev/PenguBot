const { Event } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Event {

    constructor(...args) {
        super(...args);
        this.provider = this.client.providers.default;
    }

    async run(reaction) {
        const msg = reaction.message;
        const { guild } = msg;
        if (!guild) return;
        if (!guild.configs.starboard.enabled || !guild.configs.starboard.channel) return;
        if (reaction.emoji.name !== "⭐") return;
        if (msg.reactions.get("⭐").count < guild.configs.starboard.required) return;

        const starChannel = msg.guild.channels.find(c => c.id === msg.guild.configs.starboard.channel);
        if (!starChannel || !starChannel.postable) return;
        const fetch = await starChannel.messages.fetch({ limit: 100 });
        const starMsg = fetch.find(m => m.embeds[0] && m.embeds[0].footer.text.startsWith("⭐") && m.embeds[0].footer.text.endsWith(msg.id));

        if (starMsg) {
            const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(starMsg.embeds[0].footer.text); // eslint-disable-line
            const starEmbed = starMsg.embeds[0];
            const image = msg.attachments.size > 0 ? await this.checkAttachments(msg.attachments.array()[0].url) : null;
            const embed = new MessageEmbed()
                .setColor(starEmbed.color)
                .setDescription(starEmbed.description)
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
                .setTimestamp()
                .setFooter(`⭐ ${parseInt(star[1]) + 1} | ${msg.id}`);
            if (image) embed.setImage(image);
            const oldMsg = await starChannel.messages.fetch(starMsg.id);
            await oldMsg.edit({ embed });
        } else {
            const image = msg.attachments.size > 0 ? await this.checkAttachments(msg.attachments.array()[0].url) : null;
            if (!image && msg.content.length < 1) return;
            const embed = new MessageEmbed()
                .setColor(15844367)
                .setDescription(msg.content)
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
                .setTimestamp(new Date())
                .setFooter(`⭐ ${msg.reactions.get("⭐").count} | ${msg.id}`);
            if (image) embed.setImage(image);
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
