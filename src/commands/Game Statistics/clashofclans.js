const { Command, MessageEmbed, config } = require("../../index");

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
        const playerData = await this.fetchURL(`https://api.clashofclans.com/v1/players/${encodeURIComponent(tag.toUpperCase())}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${config.apis.cocapi}` }
        }).catch(e => {
            console.error(e);
            throw `${this.client.emotes.cross} ***${msg.language.get("CMD_COC_TAG")}***`;
        });

        if (!playerData) return msg.reply(msg.language.get("CMD_COC_DATA"));

        const embed = new MessageEmbed()
            .setColor("#FCCF6E")
            .setAuthor(playerData.name, playerData.league ? playerData.league.iconUrls.small : null)
            .setThumbnail(`https://coc.guide/static/imgs/other/town-hall-${playerData.townHallLevel}.png`)
            .addField("❯ League", playerData.league ? playerData.league.name : "N/A", true)
            .addField("❯ Trophies", playerData.trophies, true)
            .addField("❯ War Stars", playerData.warStars, true)
            .addField("❯ Best Trophies", playerData.bestTrophies, true);

        if (playerData.clan) embed.setFooter(`${playerData.role} of ${playerData.clan.name}\u200e ${playerData.clan.tag}`, playerData.clan.badgeUrls.small);

        let troopLevels = "", spellLevels = "", heroLevels = "";

        for (const troop of playerData.troops) troopLevels += `${troop.name}: ${troop.level} ${troop.level === troop.maxLevel ? "🔥\n" : "\n"}`;
        for (const spell of playerData.spells) spellLevels += `${spell.name}: ${spell.level} ${spell.level === spell.maxLevel ? "🔥\n" : "\n"}`;
        for (const hero of playerData.heroes) heroLevels += `${hero.name}: ${hero.level} ${hero.level === hero.maxLevel ? "🔥\n" : "\n"}`;

        if (troopLevels) embed.addField("❯ Troop Levels", troopLevels, true);
        if (spellLevels) embed.addField("❯ Spell Levels", spellLevels, true);
        if (heroLevels) embed.addField("❯ Hero Levels", heroLevels, true);

        return msg.sendMessage(embed);
    }

};
