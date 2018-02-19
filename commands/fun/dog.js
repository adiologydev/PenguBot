const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");
const { RichEmbed } = require("discord.js");

module.exports = class DogCMD extends Command {

    constructor(client) {
        super(client, {
            name: "dog",
            aliases: ["bark", "bhow"],
            group: "fun",
            throttling: {
                usages: 1,
                duration: 10
            },
            memberName: "dog",
            description: "Grab a random dog picture with Pengu!"
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { body } = await get("https://random.dog/woof");
        const embed = new RichEmbed().setColor("#5EC7F8").setImage(`https://random.dog/${body}`);
        return msg.embed(embed);
    }

};
