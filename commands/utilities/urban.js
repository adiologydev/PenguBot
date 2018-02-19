const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const { get } = require("snekfetch");

module.exports = class UrbanCmd extends Command {

    constructor(client) {
        super(client, {
            name: "urban",
            aliases: ["urbandictionary", "urband"],
            group: "utilities",
            memberName: "urban",
            description: "Get meaning and usage of a word from Urban Dictionary.",
            examples: ["<prefix>urban <word>"],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: "word",
                prompt: "Please enter a word you want meaning for.\n",
                type: "string"
            }]
        });
    }

    async run(msg, { word }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const url = `http://api.urbandictionary.com/v0/define?term=${word}`;
        const body = await get(url).then(data => JSON.parse(data.text));
        const result = body.list[0];
        if (!result) return msg.reply("🚫 I'm really sorry but I couldn't find any meaning for this word.");
        const example = result.example ? result.example : "None";
        const UDefination = new RichEmbed()
            .setAuthor("Urban Dictionary - PenguBot", this.client.user.avatarURL)
            .addField("Word:", word)
            .addField("Meaning:", result.definition.length >= 1000 ? `${result.definition.substr(0, 1000)}...` : result.definition)
            .addField("Usage:", example)
            .addField("Permalink", `[${result.permalink}](${result.permalink})`)
            .setColor("#fff400")
            .setFooter("© PenguBot")
            .setTimestamp();
        return msg.embed(UDefination);
    }

};
