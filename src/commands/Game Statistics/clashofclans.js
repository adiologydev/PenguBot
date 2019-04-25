const Command = require("../../lib/structures/KlasaCommand");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 15,
            aliases: ["cocstats", "coc"],
            requiredPermissions: ["EMBED_LINKS"],
            description: language => language.get("COMMAND_COCSTATS_DESCRIPTION"),
            usage: "<Tag:string>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [tag]) {
        const data = await get(`https://api.clashofclans.com/v1/players/${encodeURIComponent(tag.toUpperCase().replace(/O/g, "0"))}`)
            .set({ Accept: "application/json", Authorization: `Bearer ${this.client.config.keys.games.cocapi}` })
            .catch(error => {
                if (error.reason === "notFound") msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("CMD_COC_TAG")}***`);
                Error.captureStackTrace(error);
                return null;
            });

        if (!data) return msg.reply(msg.language.get("CMD_COC_DATA"));

        const playerData = data.body;

        const embed = new MessageEmbed()
            .setColor("#FCCF6E")
            .setAuthor(playerData.name, playerData.league ? playerData.league.iconUrls.small : null)
            .setThumbnail(`https://coc.guide/static/imgs/other/town-hall-${playerData.townHallLevel}.png`);

        if (playerData.clan) embed.setFooter(`${playerData.role} of ${playerData.clan.name}\u200e ${playerData.clan.tag}`, playerData.clan.badgeUrls.small);

        embed.addField("❯ League", playerData.league ? playerData.league.name : "N/A", true)
            .addField("❯ Trophies", playerData.trophies, true)
            .addField("❯ War Stars", playerData.warStars, true)
            .addField("❯ Best Trophies", playerData.bestTrophies, true);
        let troopLevels = "", spellLevels = "", heroLevels = "";

        playerData.troops.forEach(troop => troopLevels += `${troop.name}: ${troop.level} ${troop.level === troop.maxLevel ? "🔥\n" : "\n"}`); // eslint-disable-line
        if (troopLevels) embed.addField("❯ Troop Levels", troopLevels, true);

        playerData.spells.forEach(spell => spellLevels += `${spell.name}: ${spell.level} ${spell.level === spell.maxLevel ? "🔥\n" : "\n"}`); // eslint-disable-line
        if (spellLevels) embed.addField("❯ Spell Levels", spellLevels, true);

        playerData.heroes.forEach(hero => heroLevels += `${hero.name}: ${hero.level} ${hero.level === hero.maxLevel ? "🔥\n" : "\n"}`); // eslint-disable-line
        if (heroLevels) embed.addField("❯ Hero Levels", heroLevels, true);
        return msg.sendMessage(embed);
    }

};
