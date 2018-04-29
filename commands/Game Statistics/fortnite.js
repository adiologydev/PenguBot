const { Command } = require("klasa");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 15,
            aliases: ["fnbr", "fnbrstats", "fortnitestats"],
            permLevel: 0,
            botPerms: ["EMBED_LINKS", "ATTACH_FILES"],
            ddescription: (msg) => msg.language.get("COMMAND_FORTNITE_DESCRIPTION"),
            usage: "<Platform:string> <Username:string>",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [Platform, Username]) {
        let data;
        if (Platform.toLowerCase() === "pc") {
            data = await get(`https://api.fortnitetracker.com/v1/profile/pc/${Username}`)
                .set("TRN-Api-Key", this.client.config.keys.games.fortnite);
        } else if (Platform.toLowerCase() === "xbox") {
            data = await get(`https://api.fortnitetracker.com/v1/profile/xb1/${Username}`)
                .set("TRN-Api-Key", this.client.config.keys.games.fortnite);
        } else if (Platform.toLowerCase() === "psn") {
            data = await get(`https://api.fortnitetracker.com/v1/profile/psn/${Username}`)
                .set("TRN-Api-Key", this.client.config.keys.games.fortnite);
        } else {
            return msg.channel.send("<:penguError:435712890884849664> ***Invalid Platform, please retry with either of these platforms: `pc`. `xbox`, `psn`.***");
        }

        if (!data) return msg.channel.send("<:penguError:435712890884849664> ***Invalid Username or Platform, please retry with either of these platforms: `pc`. `xbox`, `psn`.***");
        if (data.body.error) return msg.channel.send("<:penguError:435712890884849664> ***There was an error in the Tracking API, please try again later.***");

        const embed = new this.client.methods.Embed()
            .setTitle("Fortnite Battle Royale Statistics - PenguBot")
            .setFooter("© PenguBot.cc")
            .setThumbnail("https://i.imgur.com/EER1jFB.png")
            .setColor("#151842")
            .setTimestamp()
            .setDescription([`❯ **Epic Username:** ${data.body.epicUserHandle}`,
                `❯ **Score:** ${data.body.lifeTimeStats.find(a => a.key === "Score").value}`,
                `❯ **Matches Played:** ${data.body.lifeTimeStats.find(a => a.key === "Matches Played").value}`,
                `❯ **Kills:** ${data.body.lifeTimeStats.find(a => a.key === "Kills").value}`,
                `❯ **Wins:** ${data.body.lifeTimeStats.find(a => a.key === "Wins").value}`,
                `❯ **K/D:** ${data.body.lifeTimeStats.find(a => a.key === "K/d").value}`,
                `❯ **Top 3:** ${data.body.lifeTimeStats.find(a => a.key === "Top 3").value}`,
                `❯ **Platform:** ${data.body.platformNameLong}`]);
        return msg.channel.sendEmbed(embed);
    }

};
