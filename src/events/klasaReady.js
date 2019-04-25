const { Event } = require("klasa");
const MusicClient = require("../lib/structures/LavalinkClient");

module.exports = class extends Event {

    async run() {
        // Setup lavalink
        this.client.lavalink = new MusicClient(this.client, this.client.config.nodes);
        this.client.console.log(`[${this.client.shard.id}]: Online`);
    }

};
