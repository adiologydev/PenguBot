const { Task, config } = require("../index");

module.exports = class extends Task {

    async run() {
        if (this.client.user.id !== "303181184718995457" || this.client.shard.id !== 0) return;
        if (!this.client.ready) return;

        let [guilds, vc, users] = [0, 0, 0];
        const results = await this.client.shard.broadcastEval(`[this.guilds.reduce((prev, val) => val.memberCount + prev, 0), this.guilds.size, this.music.filter(music => music.playing).size]`);
        for (const result of results) {
            users += result[0];
            guilds += result[1];
            vc += result[2];
        }

        return this.fetchURL("https://server.pengubot.com/bot/statposting", { method: "POST", body: { servers: guilds, shards: this.client.shard.shardCount, voice: vc, users: users }, headers: { authorization: config.apis.pengu } });
    }

};
