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
            description: msg => msg.language.get("COMMAND_URBAN_DESCRIPTION"),
            usage: "<word:string> [...]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [...word]) {
        const { text } = await get(`http://api.urbandictionary.com/v0/define?term=${word.join(" ")}`).catch(e => {
            Error.captureStackTrace(e);
            return e;
        });
        const result = JSON.parse(text).list[0];

        if (!result) return msg.reply("<:penguError:435712890884849664> That word could not be found on Urban Dictionary.");
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("© PenguBot.cc")
            .setTitle("Urban Dictionary")
            .setThumbnail("https://i.imgur.com/roNW5D3.png")
            .setDescription(`**❯ Word:** ${result.word}

❯ **Definition:** ${result.definition}

❯ **Votes:** 👍 ${result.thumbs_up} 👎 ${result.thumbs_down}

❯ **Permalink:** ${result.permalink}`);
        return msg.sendEmbed(embed);
    }

};
