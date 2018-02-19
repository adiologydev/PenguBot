const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const { version: discordVersion } = require("discord.js");
const { version } = require("../../package.json");

module.exports = class InfomationCMD extends Command {

    constructor(client) {
        super(client, {
            name: "info",
            group: "core",
            memberName: "info",
            description: "Get information about the bot.",
            throttling: {
                usages: 1,
                duration: 3
            },
            usage: ["<prefix>info"]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const botinfo = new RichEmbed()
            .setAuthor("Information - PenguBot", this.client.user.displayAvatarURL)
            .setDescription(`PenguBot is a Multi-Purpose Discord Bot which is filled with features ranging from Moderation, Fun, Utilities and more. It is developed in NodeJS using many different technologies such as MySQL, MariaDB, and Linux.
It combines of over 100 features and is expanding at a rapid rate with over 3,600 guilds and 79,000+ users.
`)
            .setColor("#2ab069")
            .setFooter("© PenguBot", this.client.user.displayAvatarURL)
            .setTimestamp()
            .addField("Version", version, true)
            .addField("Library", `Discord.js: v${discordVersion}`, true)
            .addField("Website", "[**pengubot.com**](https://pengubot.com)", true)
            .addField("Patreon", "Support us on [**Patreon**](https://www.patreon.com/pengubot)", true)
            .addField("Author", "[**AdityaTD#5346**](https://www.adityatd.me)", true)
            .addField("Invite Pengu To Your Guild", "[**bit.ly/PenguBotInvite**](https://bit.ly/PenguBotInvite)", true)
            .addField("Join PenguBot's Support Guild", "[**discord.gg/6KpTfqR**](https://discord.gg/6KpTfqR)", true);
        msg.embed(botinfo);
    }

};
