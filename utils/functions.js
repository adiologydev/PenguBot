const validURlRegex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/; // eslint-disable-line no-useless-escape
const snekfetch = require("snekfetch");
const config = require("../config");
// const mysql = require("mysql2/promise");

class Util {

    static haste(input, extension = "js") {
        return snekfetch.post("https://hastebin.com/documents")
            .send(input)
            .then(res => `https://hastebin.com/${res.body.key}.${extension}`);
    }

    static isUpvoter(id) {
        return snekfetch.get("https://discordbots.org/api/bots/303181184718995457/check")
            .set("Authorization", config.keys.dbl)
            .query("userId", id)
            .then(res => Boolean(res.body.voted));
    }

    static async postStats(client) {
        if (client.user.id !== "303181184718995457") return;
        const stats = { server_count: client.guilds.size, shard_id: client.shard.id, shard_count: client.shard.count };

        const allGuilds = await client.shard.fetchClientValues("guilds.size");
        return Promise.all([
            snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
                .set("Authorization", config.keys.dbl).send(stats),
            snekfetch.post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
                .set("Authorization", config.keys.dbpw).send(stats),
            snekfetch.post(`https://listcord.com/api/bot/${client.user.id}/guilds`)
                .set("Authorization", config.keys.listcord).send({ guilds: client.guilds.size, shard: client.shard.id }),
            snekfetch.post(`https://botsfordiscord.com/api/v1/bots/${client.user.id}`)
                .set("Authorization", config.keys.b4d).send({ server_count: allGuilds.reduce((prev, val) => prev + val, 0) })
        ]);
    }

    static isPatron(guild) {
        return guild.client.configs.pGuilds.includes(guild.id);
    }

    static randomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static async getSongs(search) {
        return snekfetch.get(`http://${config.keys.music.host}:2333/loadtracks`)
            .set("Authorization", config.keys.music.password)
            .query("identifier", search)
            .then(res => res.body.length ? res.body : null)
            .catch(err => {
                console.error(err);
                return null;
            });
    }

    static friendlyTime(duration) {
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${hours}:${minutes}:${seconds}`;
    }

    static validURL(str) {
        return validURlRegex.test(str);
    }

    static async clearPatrons(client) {
        const results = [];
        if (!config.main.patreon) throw new Error("Not the Patron Bot.");
        for (const guild of client.guilds.values()) {
            if (!Util.isPatron(guild)) guild.leave();
            else results.push(`Left ${guild.name} (${guild.id}) of ${guild.owner ? guild.owner.user.tag : "Uncached or Banned Owner"} (${guild.ownerID})`);
        }
        return results;
    }

    // Modified code from `github:dylang/random-puppy`
    static async scrapeSubreddit(subreddit) {
        subreddit = typeof subreddit === "string" && subreddit.length !== 0 ? subreddit : "puppies";
        return snekfetch.get(`https://imgur.com/r/${subreddit}/hot.json`)
            .then(res => {
                if (!res.body.data) return;
                const img = res.body.data[Math.floor(Math.random() * res.body.data.length)];
                return `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, "")}`;
            });
    }

    /*  static async execute(client, guildid = undefined) {
        const con = await mysql.createConnection({ host: config.migrate.host, user: config.migrate.user, password: config.migrate.password, database: config.migrate.database });
        const [rows] = await con.execute(`SELECT * FROM settings WHERE guild IN ('${[...client.guilds.keys()].join("', '")}');`);
        for (const row of rows) {
            const guild = guildid ? client.guilds.get(guildid) : client.guilds.get(row.guild);
            if (!guild) continue;
            const settings = JSON.parse(row.settings || "{}");
            for (const [key, value] of Object.entries(settings)) {
                if (key.startsWith("cmd")) {
                    const [, cmdName] = key.split(".");
                    if (typeof value !== "string" && typeof cmdName !== "string") continue;
                    await guild.configs.update("customcmds.cmds", { name: cmdName, content: value });
                    continue;
                }
                if (key === "settings.wlcm-msg") {
                    await guild.configs.update("messages.welcome.message", value);
                    continue;
                }
                if (key === "settings.leav-msg") {
                    await guild.configs.update("messages.leave.message", value);
                    continue;
                }
                // Welcome Enabled and Channel ID
                if (key === "settings.wlcm-main") {
                    const [enabled, channelid] = value.split("|");
                    if (enabled && channelid && guild.channels.has(channelid)) await guild.configs.update(["messages.welcome.enabled", "messages.welcome.channel"], [true, channelid]);
                    continue;
                }
                // Leave Enabled and Channel ID
                if (key === "settings.leav-main") {
                    const [enabled, channelid] = value.split("|");
                    if (enabled && channelid && guild.channels.has(channelid)) await guild.configs.update(["messages.leave.enabled", "messages.leave.channel"], [true, channelid]);
                    continue;
                }
                // Autoroles - Disabled due to explicit errors while migrating
                if (key === "AutoRole") {
                    await guild.configs.update(["autoroles.roles", "autoroles.enabled"], [value, true], guild);
                    continue;
                }
                await guild.configs.update(key, value);
            }
        }
   } */

}

module.exports = Util;
