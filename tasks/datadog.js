const { Task } = require("klasa");

module.exports = class MemorySweeper extends Task {

    async run() {
        let [users, guilds, vc] = [0, 0, 0];
        const results = await this.client.shard.broadcastEval(`[this.guilds.reduce((prev, val) => val.memberCount + prev, 0), this.guilds.size, this.lavalink.map(u => u).filter(p => p.playing).length]`);

        for (const result of results) {
            users += result[0];
            guilds += result[1];
            vc = +result[3];
        }

        this.client.dogstats.gauge("pengubots.totalcommands", this.client.configs.counter.total);
        this.client.dogstats.gauge("pengubot.users", users);
        this.client.dogstats.gauge("pengubot.guilds", guilds);
        this.client.dogstats.gauge("pengubots.voicestreams", vc);
        return;
    }

    async init() {
        if (this.client.user.id !== "303181184718995457") return this.disable();
        if (!this.client.configs.schedules.some(schedule => schedule.taskName === this.name)) {
            await this.client.schedule.create("datadog", "*/1 * * * *");
        }
    }

};
