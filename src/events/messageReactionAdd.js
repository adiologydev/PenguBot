/* eslint-disable complexity */
const { Event } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Event {

    async run(reaction) {
        const msg = reaction.message;
        const { guild } = msg;
        if (!guild || reaction.emoji.name !== "⭐") return;
        if (!guild.settings.toggles.starboard || !guild.settings.starboard.channel) return;
        if (msg.reactions.get("⭐").count < guild.settings.starboard.required) return;

        const starChannel = msg.guild.channels.get(msg.guild.settings.starboard.channel);
        if (!starChannel || !starChannel.postable || !starChannel.embedable) return;
        if (!starChannel.nsfw && msg.channel.nsfw) return;
        const fetch = await starChannel.messages.fetch({ limit: 100 });
        const starMsg = fetch.find(m => m.embeds.length && m.embeds[0].footer && m.embeds[0].footer.text.startsWith("⭐") && m.embeds[0].footer.text.endsWith(msg.id));

        const jumpString = `[► View The Original Message](https://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id})\n`;

        if (starMsg) {
            const starEmbed = starMsg.embeds[0];
            const image = msg.attachments.size > 0 ? this.checkAttachments(msg.attachments.array()[0].url) : null;

            const embed = new MessageEmbed()
                .setColor(starEmbed.color)
                .setAuthor(`${msg.author.tag} in #${msg.channel.name}`, msg.author.displayAvatarURL())
                .setTimestamp(new Date(msg.createdTimestamp))
                .setFooter(`⭐ ${msg.reactions.get("⭐").count} | ${msg.id}`);
            if (image) embed.setImage(image);
            if (msg.content) embed.setDescription(`${jumpString}${msg.content}`);
            else embed.setDescription(jumpString);

            const oldMsg = await starChannel.messages.fetch(starMsg.id).catch(() => null);
            if (!oldMsg) return;
            if (oldMsg.author.id !== this.client.user.id) return;

            await oldMsg.edit({ embed });
        } else {
            const image = msg.attachments.size > 0 ? this.checkAttachments(msg.attachments.array()[0].url) : null;
            if (!image && !msg.content) return;

            const embed = new MessageEmbed()
                .setColor(15844367)
                .setAuthor(`${msg.author.tag} in #${msg.channel.name}`, msg.author.displayAvatarURL())
                .setTimestamp(new Date(msg.createdTimestamp))
                .setFooter(`⭐ ${msg.reactions.get("⭐").count} | ${msg.id}`);
            if (image) embed.setImage(image);
            if (msg.content) embed.setDescription(`${jumpString}${msg.content}`);
            else embed.setDescription(jumpString);

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

    get provider() {
        return this.client.providers.default;
    }

};
