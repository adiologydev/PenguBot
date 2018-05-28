// Any functions which will be available with PenguClient
const { post, get } = require("snekfetch");
const config = require("../config");

const haste = (input, extension) => new Promise((res, rej) => {
    if (!input) rej("Input argument is required.");
    post("https://hastebin.com/documents").send(input).then(body => {
        res(`https://hastebin.com/${body.body.key}${extension ? `.${extension}` : ""}`);
    }).catch(e => rej(e));
});

const isUpvoter = id => new Promise((resolve, reject) => {
    get(`https://discordbots.org/api/bots/303181184718995457/check`)
        .set("Authorization", config.keys.dbl)
        .query("userId", id)
        .then(r => {
            if (r.body.voted === 1) return resolve(true);
            return resolve(false);
        }).catch(err => reject(err));
});

const postStats = client => {
    if (client.user.id !== "303181184718995457") return;
    post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
        .set("Authorization", config.keys.dbl)
        .send({
            server_count: client.guilds.size,
            shard_id: client.shard.id,
            shard_count: client.shard.count
        }).catch(console.error);
    post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
        .set("Authorization", config.keys.dbpw)
        .send({
            server_count: client.guilds.size,
            shard_id: client.shard.id,
            shard_count: client.shard.count
        }).catch(console.error);
};

const isPatron = (client, guild) => {
    if (client.configs.pGuilds.find(g => g === guild.id)) return true;
    return false;
};

const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

async function getSongs(string) {
    const res = await get(`http://${config.keys.music.host}:2333/loadtracks?identifier=${string}`)
        .set("Authorization", config.keys.music.password)
        .catch(err => {
            console.error(err);
            return null;
        });
    if (!res) throw "There was an error, try again";
    if (!res.body.length) throw "No tracks found";
    return res.body;
}

const friendlyTime = duration => {
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds}`;
};

const validURL = str => {
    const regexp = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/; // eslint-disable-line
    if (!regexp.test(str)) {
        return false;
    } else { return true; }
};

const clearPatrons = client => {
    if (!client.config.main.patreon) return "Not the Patron Bot.";
    const guilds = client.guilds; // eslint-disable-line
    for (const guild of guilds) {
        if (!isPatron(client, guild)) guild.leave();
        return `Left ${guild.name} (${guild.id}) of ${guild.owner.user.tag} (${guild.owner.user.id})`;
    }
};

const mysql = require("mysql2/promise");
const migrate = async client => {
    const con = await mysql.createConnection({ host: config.migrate.host, user: config.migrate.user, password: config.migrate.password, database: config.migrate.database });
    const [rows] = await con.execute("SELECT * FROM settings");
    for (const row of rows) {
        let { guild, settings } = row;
        if (!(guild = client.guilds.get(guild))) continue;
        settings = JSON.parse(settings);
        for (const [key, value] of Object.entries(settings)) {
            if (key.startsWith("cmd")) {
                const [, cmdName] = key.split(".");
                guild.configs.update("customcmds", { name: cmdName, content: value });
                continue;
            }
            if (key === "settings.wlcm-msg") {
                guild.configs.update("welcome-text", value);
                continue;
            }
            if (key === "settings.leav-msg") {
                guild.configs.update("leave-text", value);
                continue;
            }
            // Welcome Enabled and Channel ID
            if (key === "settings.wlcm-main") {
                const [enabled, channelid] = value.split("|");
                if (enabled && channelid && guild.channels.has(channelid)) guild.configs.update(["welcome-messages", "welcome-channel"], [true, channelid]);
                continue;
            }
            // Leave Enabled and Channel ID
            if (key === "settings.leav-main") {
                const [enabled, channelid] = value.split("|");
                if (enabled && channelid && guild.channels.has(channelid)) guild.configs.update(["leave-messages", "leave-channel"], [true, channelid]);
                continue;
            }
            // Autoroles
            if (key === "AutoRole") {
                guild.configs.update(["auto-roles", "autoroles"], [value, true], guild);
                continue;
            }
            await guild.configs.update(key, value);
        }
    }
};

module.exports.haste = haste;
module.exports.isUpvoter = isUpvoter;
module.exports.postStats = postStats;
module.exports.isPatron = isPatron;
module.exports.randomNumber = randomNumber;
module.exports.getSongs = getSongs;
module.exports.friendlyTime = friendlyTime;
module.exports.validURL = validURL;
module.exports.clearPatrons = clearPatrons;
module.exports.migrate = migrate;
