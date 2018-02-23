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
It combines of over 100 features and is expanding at a rapid rate with over 12,000 guilds and 300,000+ users.
`)
            .setColor("RANDOM")
            .setFooter("© PenguBot", this.client.user.displayAvatarURL)
            .setTimestamp()
            .addField("Version", version, true)
            .addField("Library", `Discord.js: v${discordVersion}`, true)
            .addField("DBMS", "MariaDB", true)
            .addField("Website", "[**pengu.ml**](https://pengu.ml)", true)
            .addField("Patreon", "Support us on [**Patreon**](https://www.patreon.com/pengubot)", true)
            .addField("Author", "[**AdityaTD#5346**](https://www.adityatd.me)", true)
            .addField("Invite Pengu", "[**bit.ly/PenguBotInvite**](https://bit.ly/PenguBotInvite)", true)
            .addField("Join PenguBot's Guild", "[**discord.gg/6KpTfqR**](https://discord.gg/6KpTfqR)", true)
            .addField("GitHub", "[**AdityaTD/PenguBot**](https://www.github.com/AdityaTD/PenguBot)", true);
        msg.embed(botinfo);
    }

};
