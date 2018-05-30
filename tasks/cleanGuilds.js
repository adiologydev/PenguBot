const { Task } = require("klasa");

module.exports = class extends Task {

    async run() {
        if (this.client.config.main.patreon) {
            const { guilds } = this.client;
            for (const g of guilds) {
                if (!this.client.configs.pGuilds.includes(g.id)) await g.leave();
            }
        }
    }

    async init() {
        if (!this.client.configs.schedules.some(schedule => schedule.taskName === this.name)) {
            await this.client.schedule.create("cleanGuilds", "0 0 * * *");
        }
    }

};
