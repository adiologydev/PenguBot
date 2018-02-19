const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const { get } = require("snekfetch");
module.exports = class HugCommand extends Command {

    constructor(client) {
        super(client, {
            name: "kiss",
            aliases: [],
            group: "fun",
            memberName: "kiss",
            description: "kiss a user",
            usage: ["<prefix>kiss <user>"],
            examples: ["kiss <user>"],
            guildOnly: true,
            throttling: { duration: 15, usages: 2 },
            args: [{
                key: "user",
                prompt: "Who would you like to hug?\n",
                type: "user"
            }]
        });
    }
    async run(msg, { user }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { body } = await get("https://nekos.life/api/kiss").set("Key", this.client.config.NEKOS);
        const embed = new RichEmbed().setImage(body.url);
        return msg.say(`${user}, You got a kiss from ${msg.author.tag} ❤`, { embed });
    }

};
