// Any functions which will be available with PenguClient
const { post, get } = require("snekfetch");
const config = require("../config");

const haste = (input, extension) => new Promise((res, rej) => {
    if (!input) rej("Input argument is required.");
    post("https://hastebin.com/documents").send(input).then(body => {
        res(`https://hastebin.com/${body.body.key}${extension ? `.${extension}` : ""}`);
    }).catch(e => rej(e));
});

const isUpvoter = (id) => new Promise((resolve, reject) => {
    get(`https://discordbots.org/api/bots/303181184718995457/votes`)
        .set("Authorization", config.keys.dbl)
        .then(r => resolve(r.body.map(c => c.id).includes(id))).catch(err => reject(err));
});

const postStats = (client) => {
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

module.exports.haste = haste;
module.exports.isUpvoter = isUpvoter;
module.exports.postStats = postStats;
