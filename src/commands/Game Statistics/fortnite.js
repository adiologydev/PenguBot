const { Command, MessageEmbed, config } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 15,
            aliases: ["fnbr", "fnbrstats", "fortnitestats"],
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS", "ATTACH_FILES"],
            description: language => language.get("COMMAND_FORTNITE_DESCRIPTION"),
            usage: "<pc|xbox|psn> <Username:...string>",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [platform, username]) {
        const data = await this.fetchURL(`https://api.fortnitetracker.com/v1/profile/${platform}/${encodeURIComponent(username)}`, {
            headers: { "TRN-Api-Key": config.apis.fortnite }
        });

        if (!data) throw `${this.client.emotes.cross} ***${msg.language.get("CMD_FORT_PLAT")}***`;
        if (data.error) throw `${this.client.emotes.cross} ***${msg.language.get("CMD_FORT_ERR")}***`;

        return msg.sendEmbed(new MessageEmbed()
            .setAuthor("Fortnite Battle Royale Statistics - PenguBot", "https://i.imgur.com/EER1jFB.png")
            .setFooter("© PenguBot.com")
            .setThumbnail("https://i.imgur.com/EER1jFB.png")
            .setColor("#151842")
            .setTimestamp()
            .setDescription([`❯ **Epic Username:** ${data.epicUserHandle}`,
                `❯ **Score:** ${data.lifeTimeStats.find(a => a.key === "Score") ? data.lifeTimeStats.find(a => a.key === "Score").value.toLocaleString() : "N/A"}`,
                `❯ **Matches Played:** ${data.lifeTimeStats.find(a => a.key === "Matches Played") ? data.lifeTimeStats.find(a => a.key === "Matches Played").value.toLocaleString() : "N/A"}`,
                `❯ **Kills:** ${data.lifeTimeStats.find(a => a.key === "Kills") ? data.lifeTimeStats.find(a => a.key === "Kills").value.toLocaleString() : "N/A"}`,
                `❯ **Wins:** ${data.lifeTimeStats.find(a => a.key === "Wins") ? data.lifeTimeStats.find(a => a.key === "Wins").value.toLocaleString() : "N/A"}`,
                `❯ **K/D:** ${data.lifeTimeStats.find(a => a.key === "K/d") ? data.lifeTimeStats.find(a => a.key === "K/d").value : "N/A"}`,
                `❯ **Top 3s:** ${data.lifeTimeStats.find(a => a.key === "Top 3s") ? data.lifeTimeStats.find(a => a.key === "Top 3s").value.toLocaleString() : "N/A"}`,
                `❯ **Platform:** ${data.platformNameLong}`]));
    }

};
