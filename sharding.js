const { ShardingManager } = require("discord.js");
const { BOT_TOKEN } = require("./config.json");
const manager = new ShardingManager(`${__dirname}/main.js`, { totalShards: "auto", token: BOT_TOKEN, respawn: true });

manager.spawn();
manager.on("launch", shard => console.log(`| SHARDS | Successfully launched shard ${shard.id}`));
