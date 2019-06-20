const { Event, config } = require("../index");
const LavalinkClient = require("../lib/structures/LavalinkClient");

module.exports = class extends Event {

    async run() {
        // Setup lavalink
        this.client.lavalink = new LavalinkClient(this.client, config.nodes, {
            user: this.client.user,
            shards: this.client.shard.count
        });

        // Memory Sweeper task
        if (!this.client.settings.schedules.some(task => task.taskName === "memorySweeper")) {
            await this.client.schedule.create("memorySweeper", "*/10 * * * *");
        }

        // Spotify task
        if (!this.client.settings.schedules.some(task => task.taskName === "spotify")) {
            await this.client.schedule.create("spotify", "*/30 * * * *");
        }

        // Health task
        if (!this.client.settings.schedules.some(task => task.taskName === "health")) {
            await this.client.schedule.create("health", "* * * * *");
        }

        // sendStats task
        if (config.production && !this.client.settings.schedules.some(task => task.taskName === "stats")) {
            await this.client.schedule.create("stats", "*/20 * * * *");
        }

        // Datadog task
        if (config.production && !this.client.settings.schedules.some(task => task.taskName === "datadog")) {
            await this.client.schedule.create("datadog", "*/1 * * * *");
        }

        // Clean Guilds Task
        if (!this.client.settings.schedules.some(task => task.taskName === "cleanGuilds")) {
            await this.client.schedule.create("cleanGuilds", "0 0 * * *");
        }

        this.client.console.log(`[${this.client.shard.id}]: Online`);
    }

};
