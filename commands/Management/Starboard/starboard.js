const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["star"],
            permissionLevel: 5,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "<Message:message>",
            description: msg => msg.language.get("COMMAND_STAR_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [Message]) {
        const starChannel = msg.guild.channels.find(c => c.id === msg.guild.configs.starboard.channel);
        if (!starChannel || !starChannel.postable) return msg.reply("I do not have permissions to send Embeds in Starboard channel or Channel not found.");
        const fetch = await starChannel.messages.fetch({ limit: 100 });
        const starMsg = fetch.find(m => m.embeds[0] && m.embeds[0].footer.text.startsWith("⭐") && m.embeds[0].footer.text.endsWith(Message.id));
        const attachment = msg.attachments.first();
        const image = (attachment.height && attachment) || null;
        if (starMsg) {
            const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(starMsg.embeds[0].footer.text); // eslint-disable-line
            const starEmbed = starMsg.embeds[0];
            const embed = new MessageEmbed()
                .setColor(starEmbed.color)
                .setDescription(starEmbed.description)
                .setImage(image)
                .setAuthor(Message.author.tag, Message.author.displayAvatarURL())
                .setTimestamp()
                .setFooter(`⭐ ${msg.reactions.get("⭐").count} | ${msg.id}`);
            const oldMsg = await starChannel.messages.fetch(starMsg.id);
            return oldMsg.edit({ embed });
        } else {
            if (!image && !Message.content) return msg.reply("Can not star an Empty Message.");
            await Message.react("⭐");
            const embed = new MessageEmbed()
                .setColor(15844367)
                .setDescription(Message.content)
                .setImage(image)
                .setAuthor(Message.author.tag, Message.author.displayAvatarURL())
                .setTimestamp(new Date())
                .setFooter(`⭐ ${Message.reactions.get("⭐").count} | ${Message.id}`);
            return starChannel.send({ embed });
        }
    }

};
