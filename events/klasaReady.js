const { Event } = require("klasa");
const { PlayerManager } = require("discord.js-lavalink");

module.exports = class extends Event {

    async run() {
        // Lavalink
        this.client.lavalink = new PlayerManager(this.client, this.client.config.nodes, {
            user: this.client.user.id,
            shards: this.client.shard.count
        });
        if (this.client.config.main.status) this.client.whStatus.send(`✅ **ONLINE:** Shard \`${this.client.shard.id}\` is now online.`);
    }

};
