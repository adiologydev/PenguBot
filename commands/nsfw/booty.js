const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const { get } = require("snekfetch");

module.exports = class ButtsCommand extends Command {

    constructor(client) {
        super(client, {
            name: "booty",
            aliases: ["ass", "butt", "butts"],
            group: "nsfw",
            memberName: "booty",
            description: "Gets a NSFW Booty Picture.",
            examples: ["butts", "ass"],
            guildOnly: false,
            throttling: {
                usages: 1,
                duration: 15
            }
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const upvoter = await this.client.functions.isUpvoter(msg.author.id) || await this.client.functions.isPatreon(msg);
        if (!upvoter) {
            return msg.reply(`<:blobsad:373821680813867008> | Pengu's Internet is being limited, you may only use NSFW commands if you're a **Patron** or **Upvoter** for now.

**Discord Bot List (Upvote Here)**: <https://discordbots.org/bot/PenguBot>
**Patreon**: <https://patreon.com/PenguBot>`);
        }
        if (msg.channel.nsfw) {
            const { body } = await get("http://api.obutts.ru/butts/0/1/random");
            const embed = new RichEmbed()
                .setColor("#f890ff")
                .setImage(`http://media.obutts.ru/${body[0].preview}`);
            return msg.embed(embed);
        } else {
            return msg.channel.send("You can only use these commands in NSFW channels.");
        }
    }

};
