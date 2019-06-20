const { Event, config } = require("../index");
const LavalinkClient = require("../lib/structures/LavalinkClient");

module.exports = class extends Event {

    async run() {
        // Setup lavalink
        this.client.lavalink = new LavalinkClient(this.client, config.nodes, { user: this.client.user });
        this.client.console.log(`[${this.client.shard.id}]: Online`);
    }

};
