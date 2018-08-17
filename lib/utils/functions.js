const snekfetch = require("snekfetch");
const config = require("../../config");

class Util {

    static haste(input, extension = "js") {
        return snekfetch.post("https://hastebin.com/documents")
            .send(input)
            .then(res => `https://hastebin.com/${res.body.key}.${extension}`);
    }

    static async isUpvoter(user) {
        const diff = Date.now() - user.settings.lastUpvote;
        if (diff >= 43200000) return true;
        return false;
    }

    static isPatron(guild) {
        return guild.client.settings.pGuilds.includes(guild.id);
    }

    static randomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static friendlyDuration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString();
        const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
        return `${hrs.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
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
                    await guild.settings.update("customcmds.cmds", { name: cmdName, content: value });
                    continue;
                }
                if (key === "settings.wlcm-msg") {
                    await guild.settings.update("messages.welcome.message", value);
                    continue;
                }
                if (key === "settings.leav-msg") {
                    await guild.settings.update("messages.leave.message", value);
                    continue;
                }
                // Welcome Enabled and Channel ID
                if (key === "settings.wlcm-main") {
                    const [enabled, channelid] = value.split("|");
                    if (enabled && channelid && guild.channels.has(channelid)) await guild.settings.update(["messages.welcome.enabled", "messages.welcome.channel"], [true, channelid]);
                    continue;
                }
                // Leave Enabled and Channel ID
                if (key === "settings.leav-main") {
                    const [enabled, channelid] = value.split("|");
                    if (enabled && channelid && guild.channels.has(channelid)) await guild.settings.update(["messages.leave.enabled", "messages.leave.channel"], [true, channelid]);
                    continue;
                }
                // Autoroles - Disabled due to explicit errors while migrating
                if (key === "AutoRole") {
                    await guild.settings.update(["autoroles.roles", "autoroles.enabled"], [value, true], guild);
                    continue;
                }
                await guild.settings.update(key, value);
            }
        }
   } */

}

module.exports = Util;
