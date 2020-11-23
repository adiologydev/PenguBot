const { Event, MessageEmbed } = require("../index");

module.exports = class extends Event {

    async run(guild) {
        this.client.dogstats.increment("pengubot.guildsadded");

        const prefix = guild.settings.get("prefix") || "p!";
        const embed = new MessageEmbed()
            .setAuthor("Welcome to PenguBot", this.client.user.displayAvatarURL(), "https://pengubot.com")
            .setDescription([
                "Hey! Thank you for inviting me to your server. I am Pengu, a highly advanced multi-purpose Discord Bot! I am here to make your server more engaging, fun, and safe.",
                "",
                "**Features**: Music, Social Profiles, Leaderboard, Economy, AI Moderation, Starboard, Server and Mod Logs, Join, Self & Level Roles, Custom Commands, Welcome & Leave Messages, Image Manipulation, Reddit, Jokes, Memes, and much more!",
                "",
                "➡️ **Official Website:** [PenguBot.com](https://pengubot.com/)",
                "➡️ **List of Commands:** [PenguBot.com/commands](https://pengubot.com/commands)",
                "➡️ **Add PenguBot to your server:** [PenguBot.com/invite](https://pengubot.com/invite)",
                "➡️ **By using PenguBot you agree with:** [Terms of Service](https://pengubot.com/tos) - [Privacy Policy](https://pengubot.com/privacy)"
            ].join("\n"))
            .addField("Server Prefix", `${prefix}`, true)
            .addField("Setup PenguBot", `${prefix}settings`, true)
            .addField("Need Help?", "[Official Server](https://pengubot.com/support)", true)
            .setFooter("PenguBot.com")
            .setTimestamp();

        const channels = guild.channels.cache.filter(c => c.type === "text");
        const channel = channels.filter(c => c.permissionsFor(guild.me).has(["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"]));
        channel.first().send({ embed });
    }

};
