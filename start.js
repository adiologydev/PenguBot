const { ShardingManager } = require("discord.js");
const { main } = require("./config.json");

const manager = new ShardingManager(`./app.js`, { totalShards: main.shards, token: main.token, respawn: true });

manager.spawn(manager.totalShards, 11000, false);
manager.on("shardCreate", shard => {
    console.log(`💠- Shard ${shard.id} is now online`);
});
