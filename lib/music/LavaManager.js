const { PlayerManager } = require("discord.js-lavalink");

class LavaManager {

    constructor(client) {
        this.client = client;
    }

    manager() {
        const manager = new PlayerManager(this.client, this.client.config.nodes, {
            user: this.client.user.id,
            shards: this.client.shard.count
        });
        return manager;
    }

}

module.exports = LavaManager;
