const Command = require("../../lib/structures/KlasaCommand");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 15,
            aliases: ["counterstrike"],
            requiredPermissions: ["EMBED_LINKS", "ATTACH_FILES"],
            description: language => language.get("COMMAND_CSGO_DESCRIPTION"),
            usage: "<Username:string>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [username]) {
        const userData = await get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/`)
            .query({ key: this.client.config.keys.games.csgo, vanityurl: username })
            .catch(e => {
                Error.captureStackTrace(e);
                throw `${this.client.emotes.cross} ***${msg.language.get("CMD_CSGO_NF")}***`;
            });

        if (userData.body.response.success !== 1) throw `${this.client.emotes.cross} ***${msg.language.get("CMD_CSGO_NF")}***`;
        const steamID = userData.body.response.steamid;

        const userStats = await get(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/`)
            .query({ key: this.client.config.keys.games.csgo, appid: 730, steamid: steamID })
            .catch(e => {
                Error.captureStackTrace(e);
                throw `${this.client.emotes.cross} ***${msg.language.get("CMD_CSGO_ER")}***`;
            });

        if (userStats.status !== 200) throw `${this.client.emotes.cross} ***${msg.language.get("CMD_CSGO_ER")}***`;
        const { stats } = userStats.body.playerstats;
        return msg.sendMessage(new MessageEmbed()
            .setAuthor("Counter Strike : Global Offensive - PenguBot", "https://i.imgur.com/0S2t2qQ.png")
            .setFooter("© PenguBot.com")
            .setThumbnail("https://i.imgur.com/0S2t2qQ.png")
            .setColor("#FB9E01")
            .setTimestamp()
            .addField("❯ Steam Username", username, true)
            .addField("❯ KDR", (stats ? stats.find(a => a.name === "total_kills").value / stats.find(a => a.name === "total_deaths").value : 0).toFixed(2), true)
            .addField("❯ Total Kills", stats.find(a => a.name === "total_kills") ? stats.find(a => a.name === "total_kills").value.toLocaleString() : 0, true)
            .addField("❯ Total Deaths", stats.find(a => a.name === "total_deaths") ? stats.find(a => a.name === "total_deaths").value.toLocaleString() : 0, true)
            .addField("❯ Total Wins", stats.find(a => a.name === "total_wins") ? stats.find(a => a.name === "total_wins").value.toLocaleString() : 0, true)
            .addField("❯ Total MVPs", stats.find(a => a.name === "total_mvps") ? stats.find(a => a.name === "total_mvps").value.toLocaleString() : 0, true)
            .addField("❯ Time Played (Not Idle)", `${stats ? (stats.find(a => a.name === "total_time_played").value / 60 / 60).toFixed(2) : 0} Hour(s)`, true)
            .addField("❯ Knife Kills", stats.find(a => a.name === "total_kills_knife") ? stats.find(a => a.name === "total_kills_knife").value.toLocaleString() : 0, true));
    }

};
