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
            snekfetch.post(`https://listcord.com/api/bot/${this.client.user.id}/guilds`)
                .set("token", this.client.config.keys.listcord).send({ guilds: this.client.guilds.size, shard: this.client.shard.id }),
            snekfetch.post(`https://botsfordiscord.com/api/v1/bots/${this.client.user.id}`)
                .set("Authorization", this.client.config.keys.b4d).send({ server_count: allGuilds.reduce((prev, val) => prev + val, 0) })
        ]);
    }

    async init() {
        if (!this.client.configs.schedules.some(schedule => schedule.taskName === this.name)) {
            await this.client.schedule.create("dbl", "*/15 * * * *");
        }
    }

};
