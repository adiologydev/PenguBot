const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class PatreonCMD extends Command {

    constructor(client) {
        super(client, {
            name: "patreon",
            group: "core",
            aliases: ["patron", "keepalive"],
            memberName: "patreon",
            description: "Want to keep this bot alive? Become a patron today and get rewarded.",
            usage: ["<prefix>patreon"]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const donate = new RichEmbed()
            .setAuthor("Patreon - PenguBot", this.client.user.displayAvatarURL)
            .setColor("#e6461a")
            .setFooter("© PenguBot", this.client.user.displayAvatarURL)
            .setTimestamp()
            .setThumbnail("https://c5.patreon.com/external/logo/downloads_logomark_color_on_coral.png")
            .addField('Want to keep this bot alive?', 'The bot developers pays for this bot to run 24/7 and if you like this bot and want to help it stay alive, please consider becoming a Patron today and you\'ll receive rewards and swag in return!') // eslint-disable-line
            .addField("Patreon Link (With Rewards)", "[**Patreon**](https://www.patreon.com/pengubot)", true)
            .addField("PayPal Link (No Rewards)", "[**PayPal**](https://paypal.me/AdityaTD)", true)
            .addField(`Author's`, `[**AdityaTD**](https://www.adityatd.me)`);
        msg.embed(donate);
    }

};
