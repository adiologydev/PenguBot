const { Command } = require("klasa");
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
            usage: "<word:string> [...]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [...word]) {
        if (!msg.channel.nsfw) return msg.sendMessage(`<:penguError:435712890884849664> ***This channel is not NSFW and you know how Urban Dictionary is. I can't send it here, sorry.***`);
        const { text } = await get(`http://api.urbandictionary.com/v0/define?term=${word.join(" ")}`).catch(e => {
            Error.captureStackTrace(e);
            return e;
        });
        const result = JSON.parse(text).list[0];
        if (!result) return msg.reply("<:penguError:435712890884849664> That word could not be found on Urban Dictionary.");

        const defination = result.definition.length <= 5900 ? result.definition : `${result.definition.substring(0, 5900)}...`;

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
