const { Event } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Event {

    async run(reaction) {
        const msg = reaction.message;
        const { guild } = msg;
        if (!guild || reaction.emoji.name !== "⭐") return;
        if (!guild.settings.get("toggles.starboard") || !guild.settings.get("starboard.channel")) return;

        const starChannel = msg.guild.channels.cache.get(msg.guild.settings.get("starboard.channel"));
        if (!starChannel || !starChannel.postable || !starChannel.embedable) return;
        if (!starChannel.nsfw && msg.channel.nsfw) return;

        const fetch = await starChannel.messages.fetch({ limit: 100 });
        const starMsg = fetch.find(m => m.embeds.length && m.embeds[0].footer && m.embeds[0].footer.text.startsWith("⭐") && m.embeds[0].footer.text.endsWith(msg.id));

        const jumpString = `[► View The Original Message](https://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id})\n`;

        if (starMsg) {
            const starEmbed = starMsg.embeds[0];
            const image = msg.attachments.size > 0 ? await this.checkAttachments(msg.attachments.array()[0].url) : null;

            const embed = new MessageEmbed()
                .setColor(starEmbed.color)
                .setAuthor(`${msg.author.tag} in #${msg.channel.name}`, msg.author.displayAvatarURL())
                .setTimestamp(new Date(msg.createdTimestamp))
                .setFooter(`⭐ ${msg.reactions.cache.get("⭐") ? msg.reactions.cache.get("⭐").count : 0} | ${msg.id}`);

            if (image) embed.setImage(image);
            if (msg.content) embed.setDescription(`${jumpString}${msg.content}`);
            else embed.setDescription(jumpString);

            const oldMsg = await starChannel.messages.fetch(starMsg.id).catch(() => null);
            if (!oldMsg) return;
            if (oldMsg.author.id !== this.client.user.id) return;
            if (!msg.reactions.cache.get("⭐")) return oldMsg.delete();

            await oldMsg.edit({ embed });
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
