const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");
const { RichEmbed } = require("discord.js");

module.exports = class CatCommand extends Command {

    constructor(client) {
        super(client, {
            name: "cat",
            aliases: ["meow", "randomcat"],
            group: "fun",
            memberName: "cat",
            description: "Grab a random cat picture with Pengu!",
            throttling: {
                usages: 1,
                duration: 10
            },
            examples: ["<prefix>cat"]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { body } = await get("https://catfact.ninja/fact");
        const embed = new RichEmbed()
            .setColor("#2391e7")
            .setDescription(body.fact)
            .setImage(`http://thecatapi.com/api/images/get?format=src&type=jpg&size=med&${Date.now()}`);
        msg.embed(embed);
    }

};
