const { Task, config } = require("../index");
const fetch = require("node-fetch");

module.exports = class extends Task {

    async run() {
        if (this.client.user.id !== "303181184718995457" || this.client.shard.id !== 0) return;

        let [guilds, vc, users] = [0, 0, 0];
        const results = await this.client.shard.broadcastEval(`[this.guilds.reduce((prev, val) => val.memberCount + prev, 0), this.guilds.size, this.lavalink.map(u => u).filter(p => p.playing).length]`);
        for (const result of results) {
            users += result[0];
            guilds += result[1];
            vc += result[2];
        }

        return fetch("https://server.pengubot.com/bot/statposting", { method: "POST", body: { servers: guilds, shards: this.client.shard.shardCount, voice: vc, users: users }, headers: { authorization: config.apis.pengu } });
    }

    async init() {
        if (!this.client.settings.schedules.some(schedule => schedule.taskName === this.name)) {
            await this.client.schedule.create(this.name, "*/15 * * * *");
        }
    }

};
