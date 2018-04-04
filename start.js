const { ShardingManager } = require("discord.js");
const { main } = require("./config.json");
const manager = new ShardingManager(`${__dirname}/app.js`, { totalShards: main.shards, token: main.token, respawn: true });

manager.spawn();
manager.on("launch", shard => console.log(`💠- Shard ${shard.id} is now online`));
