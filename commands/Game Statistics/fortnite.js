const { Command } = require("klasa");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 15,
            aliases: ["fnbr", "fnbrstats", "fortnitestats"],
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS", "ATTACH_FILES"],
            description: msg => msg.language.get("COMMAND_FORTNITE_DESCRIPTION"),
            usage: "<Platform:string> <Username:string> [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [Platform, ...Username]) {
        let data;
        if (Platform.toLowerCase() === "pc") {
            data = await get(`https://api.fortnitetracker.com/v1/profile/pc/${Username.join(" ")}`)
                .set("TRN-Api-Key", this.client.config.keys.games.fortnite)
                .catch(e => {
                    Error.captureStackTrace(e);
                    return e;
                });
        } else if (Platform.toLowerCase() === "xbox") {
            data = await get(`https://api.fortnitetracker.com/v1/profile/xb1/${Username.join(" ")}`)
                .set("TRN-Api-Key", this.client.config.keys.games.fortnite)
                .catch(e => {
                    Error.captureStackTrace(e);
                    return e;
                });
        } else if (Platform.toLowerCase() === "psn") {
            data = await get(`https://api.fortnitetracker.com/v1/profile/psn/${Username.join(" ")}`)
                .set("TRN-Api-Key", this.client.config.keys.games.fortnite)
                .catch(e => {
                    Error.captureStackTrace(e);
                    return e;
                });
        } else {
            return msg.sendMessage("<:penguError:435712890884849664> ***Invalid Platform, please retry with either of these platforms: `pc`. `xbox`, `psn`.***");
        }

        if (!data || !data.body) return msg.sendMessage("<:penguError:435712890884849664> ***Invalid Username or Platform, please retry with either of these platforms: `pc`. `xbox`, `psn`.***");
        if (data.body.error) return msg.sendMessage("<:penguError:435712890884849664> ***There was an error in the Tracking API, please try again later.***");

        const embed = new MessageEmbed()
            .setTitle("Fortnite Battle Royale Statistics - PenguBot")
            .setFooter("© PenguBot.com")
            .setThumbnail("https://i.imgur.com/EER1jFB.png")
            .setColor("#151842")
            .setTimestamp()
            .setDescription([`❯ **Epic Username:** ${data.body.epicUserHandle}`,
                `❯ **Score:** ${data.body.lifeTimeStats.find(a => a.key === "Score").value}`,
                `❯ **Matches Played:** ${data.body.lifeTimeStats.find(a => a.key === "Matches Played").value}`,
                `❯ **Kills:** ${data.body.lifeTimeStats.find(a => a.key === "Kills").value}`,
                `❯ **Wins:** ${data.body.lifeTimeStats.find(a => a.key === "Wins").value}`,
                `❯ **K/D:** ${data.body.lifeTimeStats.find(a => a.key === "K/d").value}`,
                `❯ **Top 3s:** ${data.body.lifeTimeStats.find(a => a.key === "Top 3s").value}`,
                `❯ **Platform:** ${data.body.platformNameLong}`]);
        return msg.sendMessage(embed);
    }

};
