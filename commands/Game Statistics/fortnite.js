const Command = require("../../lib/structures/KlasaCommand");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 15,
            aliases: ["fnbr", "fnbrstats", "fortnitestats"],
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS", "ATTACH_FILES"],
            description: language => language.get("COMMAND_FORTNITE_DESCRIPTION"),
            usage: "<pc|xbox|psn> <Username:string> [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [platform, ...username]) {
        const data = await get(`https://api.fortnitetracker.com/v1/profile/${platform}/${encodeURIComponent(username.join(" "))}`)
            .set("TRN-Api-Key", this.client.config.keys.games.fortnite)
            .catch(e => {
                Error.captureStackTrace(e);
                throw e;
            });

        if (!data || !data.body) throw `${this.client.emotes.cross} ***${msg.language.get("CMD_FORT_PLAT")}***`;
        if (data.body.error) throw `${this.client.emotes.cross} ***${msg.language.get("CMD_FORT_ERR")}***`;

        return msg.sendMessage(new MessageEmbed()
            .setTitle("Fortnite Battle Royale Statistics - PenguBot")
            .setFooter("© PenguBot.com")
            .setThumbnail("https://i.imgur.com/EER1jFB.png")
            .setColor("#151842")
            .setTimestamp()
            .setDescription([`❯ **Epic Username:** ${data.body.epicUserHandle}`,
                `❯ **Score:** ${data.body.lifeTimeStats.find(a => a.key === "Score").value ? data.body.lifeTimeStats.find(a => a.key === "Score").value : "N/A"}`,
                `❯ **Matches Played:** ${data.body.lifeTimeStats.find(a => a.key === "Matches Played").value ? data.body.lifeTimeStats.find(a => a.key === "Matches Played").value : "N/A"}`,
                `❯ **Kills:** ${data.body.lifeTimeStats.find(a => a.key === "Kills").value ? data.body.lifeTimeStats.find(a => a.key === "Kills").value : "N/A"}`,
                `❯ **Wins:** ${data.body.lifeTimeStats.find(a => a.key === "Wins").value ? data.body.lifeTimeStats.find(a => a.key === "Wins").value : "N/A"}`,
                `❯ **K/D:** ${data.body.lifeTimeStats.find(a => a.key === "K/d").value ? data.body.lifeTimeStats.find(a => a.key === "K/d").value : "N/A"}`,
                `❯ **Top 3s:** ${data.body.lifeTimeStats.find(a => a.key === "Top 3s").value ? data.body.lifeTimeStats.find(a => a.key === "Top 3s").value : "N/A"}`,
                `❯ **Platform:** ${data.body.platformNameLong}`]));
    }

};
