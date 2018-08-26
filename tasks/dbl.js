const { Task } = require("klasa");
const snekfetch = require("snekfetch");

module.exports = class extends Task {

    async run() {
        if (this.client.user.id !== "303181184718995457") return;
        const stats = { server_count: this.client.guilds.size, shard_id: this.client.shard.id, shard_count: this.client.shard.count };

        const allGuilds = await this.client.shard.fetchClientValues("guilds.size");
        return Promise.all([
            snekfetch.post(`https://discordbots.org/api/bots/${this.client.user.id}/stats`)
                .set("Authorization", this.client.config.keys.dbl).send(stats),
            snekfetch.post(`https://bots.discord.pw/api/bots/${this.client.user.id}/stats`)
                .set("Authorization", this.client.config.keys.dbpw).send(stats),
            snekfetch.post(`https://discordbotlist.com/api/bots/${this.client.user.id}/stats`)
                .set("Authorization", `Bot ${this.client.config.keys.ogdbl}`).send({ guilds: this.client.guilds.size, users: this.client.guilds.reduce((prev, val) => val.memberCount + prev, 0), shard_id: this.client.shard.id, voice_connections: this.client.lavalink.size }),
            snekfetch.post(`https://botsfordiscord.com/api/v1/bots/${this.client.user.id}`)
                .set("Authorization", this.client.config.keys.b4d).send({ server_count: allGuilds.reduce((prev, val) => prev + val, 0) }),
            snekfetch.post(`https://discordbots.group/api/bot/${this.client.user.id}`)
                .set("Authorization", this.client.config.keys.dbg).send({ count: allGuilds.reduce((prev, val) => prev + val, 0) })
        ]);
    }

    async init() {
        if (!this.client.settings.schedules.some(schedule => schedule.taskName === this.name)) {
            await this.client.schedule.create("dbl", "*/15 * * * *");
        }
    }

};
