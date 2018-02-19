const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const { get } = require("snekfetch");
module.exports = class HugCommand extends Command {

    constructor(client) {
        super(client, {
            name: "hug",
            aliases: [],
            group: "fun",
            memberName: "hug",
            description: "hugs a user",
            usage: ["<prefix>hug <user>"],
            examples: ["hug <user>"],
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [{
                key: "user",
                prompt: "Who would you like to hug?\n",
                type: "user"
            }]
        });
    }
    async run(msg, { user }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { body } = await get("https://nekos.life/api/hug").set("Key", this.client.config.NEKOS);
        const embed = new RichEmbed().setImage(body.url);
        return msg.say(`${user}, You got a hug from ${msg.author.tag} ❤`, { embed });
    }

};
