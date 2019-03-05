const { ShardingManager } = require("discord.js");
const { main } = require("./config.json");

require("./src/lib/extensions/Shard");

const manager = new ShardingManager(`./src/PenguBot.js`, { totalShards: main.shards, token: main.token, respawn: true });

manager.spawn(manager.totalShards, 5500, false);
manager.on("shardCreate", shard => {
    console.log(`💠- Shard ${shard.id} is now online`);
});
