const { Task } = require("../index");
const snekfetch = require("snekfetch");

module.exports = class extends Task {

    async run() {
        if (this.client.user.id !== "303181184718995457") return;
        const stats = { server_count: this.client.guilds.size, shard_count: this.client.shard.shardCount };

        let [guilds, vc, users] = [0, 0, 0];

        const results = await this.client.shard.broadcastEval(`[this.guilds.reduce((prev, val) => val.memberCount + prev, 0), this.guilds.size, this.lavalink.map(u => u).filter(p => p.playing).length]`);
        for (const result of results) {
            users += result[0];
            guilds += result[1];
            vc += result[2];
        }

        return Promise.all([
            snekfetch.post(`https://discordbots.org/api/bots/${this.client.user.id}/stats`)
                .set("Authorization", this.client.config.keys.dbl).send(stats),
            snekfetch.post(`https://bots.discord.pw/api/bots/${this.client.user.id}/stats`)
                .set("Authorization", this.client.config.keys.dbpw).send(stats),
            snekfetch.post(`https://discordbotlist.com/api/bots/${this.client.user.id}/stats`)
                .set("Authorization", `Bot ${this.client.config.keys.ogdbl}`).send({ guilds: guilds, users: users, shard_id: 0, voice_connections: vc }),
            snekfetch.post(`https://botsfordiscord.com/api/bot/${this.client.user.id}`)
                .set("Authorization", this.client.config.keys.b4d).send({ server_count: guilds }),
            snekfetch.post(`https://api.discordbots.group/v1/bot/${this.client.user.id}`)
                .set("Authorization", this.client.config.keys.dbg).send({ server_count: guilds })
        ]);
    }

    async init() {
        if (!this.client.settings.schedules.some(schedule => schedule.taskName === this.name)) {
            await this.client.schedule.create("dbl", "*/15 * * * *");
        }
    }

};
