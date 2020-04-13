const { Command, MessageEmbed, config } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 15,
            aliases: ["crstats", "clashstats", "clashroyalestats"],
            requiredPermissions: ["EMBED_LINKS", "ATTACH_FILES"],
            description: language => language.get("COMMAND_CRSTATS_DESCRIPTION"),
            usage: "<Tag:string>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [tag]) {
        const data = await this.fetchURL(`https://api.royaleapi.com/player/${tag.toUpperCase()}`, {
            headers: { auth: config.apis.crapi }
        });

        return msg.sendEmbed(new MessageEmbed()
            .setAuthor("Clash Royale Player Statistics - PenguBot", "https://i.imgur.com/4xXGK08.png")
            .setFooter("© PenguBot.com")
            .setThumbnail("https://i.imgur.com/4xXGK08.png")
            .setColor("#398ce7")
            .setTimestamp()
            .setDescription([`❯ **Name | Tag:** ${data.name} | ${data.tag}`,
                `❯ **Trophies / Max Trophies:** ${data.trophies ? data.trophies.toLocaleString() : 0} / ${data.stats.maxTrophies ? data.stats.maxTrophies.toLocaleString() : 0}`,
                `❯ **Rank:** ${data.rank ? data.rank.toLocaleString() : "N/A"}`,
                `❯ **Arena:** ${data.arena.name} - ${data.arena.arena}`,
                `❯ **Total / Wins / Draws / Losses:** ${data.games.total} / ${data.games.wins} / ${data.games.draws} / ${data.games.losses}`,
                `❯ **Deck:** [View User's Current Deck](${data.deckLink})`]));
    }

};
