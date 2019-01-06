const Command = require("../../lib/structures/KlasaCommand");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            aliases: ["urband", "urbandictionary"],
            cooldown: 10,
            requiredPermissions: ["EMBED_LINKS", "ATTACH_FILES"],
            description: language => language.get("COMMAND_URBAN_DESCRIPTION"),
            usage: "<word:string>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [word]) {
        if (!msg.channel.nsfw) return msg.sendMessage(`${this.client.emotes.cross} ***This channel is not NSFW and you know how Urban Dictionary is. I can't send it here, sorry.***`);
        const { text } = await get(`http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(word)}`).catch(e => {
            Error.captureStackTrace(e);
            return e;
        });

        if (!text || !text.list) return msg.reply(`${this.client.emotes.cross} ***That word could not be found on Urban Dictionary.***`);

        const result = JSON.parse(text).list[0];
        const defination = result.definition.length <= 1800 ? result.definition : `${result.definition.substring(0, 1800)}...`;

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setTitle("Urban Dictionary")
            .setThumbnail("https://i.imgur.com/roNW5D3.png")
            .setDescription(`**❯ Word:** ${result.word}

❯ **Definition:** ${defination}

❯ **Votes:** 👍 ${result.thumbs_up} 👎 ${result.thumbs_down}

❯ **Permalink:** ${result.permalink}`);
        return msg.sendEmbed(embed);
    }

};
