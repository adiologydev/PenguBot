const { Command } = require("klasa");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 15,
            aliases: ["crstats", "clashstats", "clashroyalestats"],
            requiredPermissions: ["EMBED_LINKS", "ATTACH_FILES"],
            description: msg => msg.language.get("COMMAND_CRSTATS_DESCRIPTION"),
            usage: "<Tag:string>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [Tag]) {
        let data;
        try {
            data = await get(`https://api.royaleapi.com/player/${Tag.toUpperCase()}`).set("auth", `${this.client.config.keys.games.crapi}`).catch(e => {
                Error.captureStackTrace(e);
                return e;
            });
        } catch (e) {
            return msg.sendMessage("<:penguError:435712890884849664> ***Invalid Tag, please retry with a valid one which you can find under Game Settings.***");
        }

        if (!data) return msg.reply("There was an error, please try again later.");

        const { body } = data;
        const embed = new MessageEmbed()
            .setTitle("Clash Royale Player Statistics - PenguBot")
            .setFooter("© PenguBot.com")
            .setThumbnail("https://i.imgur.com/4xXGK08.png")
            .setColor("#398ce7")
            .setTimestamp()
            .setDescription([`❯ **Name | Tag:** ${body.name} | ${body.tag}`,
                `❯ **Trophies / Max Trophies:** ${body.trophies ? body.trophies.toLocaleString() : 0} / ${body.stats.maxTrophies ? body.stats.maxTrophies.toLocaleString() : 0}`,
                `❯ **Rank:** ${body.rank ? body.rank.toLocaleString() : "N/A"}`,
                `❯ **Arena:** ${body.arena.name} - ${body.arena.arena}`,
                `❯ **Total / Wins / Draws / Losses:** ${body.games.total} / ${body.games.wins} / ${body.games.draws} / ${body.games.losses}`,
                `❯ **Deck:** [View User's Current Deck](${body.deckLink})`]);
        return msg.sendMessage(embed);
    }

};
