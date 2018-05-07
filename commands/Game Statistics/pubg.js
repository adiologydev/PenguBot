const { Command } = require("klasa");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 15,
            aliases: ["playerunknown", "pubgstats", "playerunknownbattlegrounds"],
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS", "ATTACH_FILES"],
            ddescription: (msg) => msg.language.get("COMMAND_PUBG_DESCRIPTION"),
            usage: "<Username:string>",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [Username]) {
        const { body } = await get(`https://api.pubgtracker.com/v2/profile/pc/${Username}`)
            .set("TRN-Api-Key", this.client.config.keys.games.pubg);

        if (!body) return msg.channel.send("<:penguError:435712890884849664> ***Invalid Username, please try again.***");
        if (body.error) return msg.channel.send("<:penguError:435712890884849664> ***There was an error in the Tracking API, please try again later.***");

        /* const embed = new MessageEmbed()
            .setTitle("PUBG Statistics - PenguBot")
            .setFooter("© PenguBot.cc")
            .setThumbnail("https://i.imgur.com/7whEYqU.png")
            .setColor("#F7C721")
            .setTimestamp()
            .setDescription([`❯ **Epic Username:** ${data.body.epicUserHandle}`,
                `❯ **Score:** ${data.body.lifeTimeStats.find(a => a.key === "Score").value}`,
                `❯ **Matches Played:** ${data.body.lifeTimeStats.find(a => a.key === "Matches Played").value}`,
                `❯ **Kills:** ${data.body.lifeTimeStats.find(a => a.key === "Kills").value}`,
                `❯ **Wins:** ${data.body.lifeTimeStats.find(a => a.key === "Wins").value}`,
                `❯ **K/D:** ${data.body.lifeTimeStats.find(a => a.key === "K/d").value}`,
                `❯ **Top 3:** ${data.body.lifeTimeStats.find(a => a.key === "Top 3").value}`,
                `❯ **Platform:** ${data.body.platformNameLong}`]);*/
        return console.log(body);
        // return msg.channel.sendEmbed(embed);
    }

};
