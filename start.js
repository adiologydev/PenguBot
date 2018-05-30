const { ShardingManager, WebhookClient } = require("discord.js");
const { main, webhooks } = require("./config.json");
const webhook = new WebhookClient("451318929814716426", webhooks.status);

const manager = new ShardingManager(`./app.js`, { totalShards: main.shards, token: main.token, respawn: true });

manager.spawn();
manager.on("shardCreate", shard => {
    console.log(`💠- Shard ${shard.id} is now online`);
    if (main.status) webhook.send(`💠 **ONLINE:** Shard \`${shard.id}\` is now online`);
});
