const { Event } = require("klasa");

const MusicClient = require("../lib/music/LavalinkClient");
const Player = require("../lib/music/Player");

module.exports = class Ready extends Event {

    async run() {
        this.bindMusic();
        this.client.setMaxListeners(50);
    }

    async bindMusic() {
        this.client.lavalink = new MusicClient(this.client, {
            nodes: this.client.config.nodes,
            user: this.client.user.id,
            shards: this.client.shard ? this.client.shard.count : 1,
            rest: this.client.config.restnode,
            player: Player,
            regions: {
                defaultRegion: this.client.config.regions.defaultRegion,
                defaultRegions: this.client.config.regions.defaultRegions
            }
        });
        this.client.emit("log", "[MUSIC] Manager hook has been enabled.");
    }

};
