const { Event } = require("klasa");
const { PlayerManager } = require("discord.js-lavalink");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run() {
        const manager = new PlayerManager(this.client, this.client.config.nodes, {
            user: this.client.user.id,
            shards: this.client.shard.count
        });

        this.client.lavalink = manager;
    }

};
