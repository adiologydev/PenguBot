const { Task } = require("klasa");

module.exports = class extends Task {

    async run() {
        for (const guild of this.client.guilds) {
            if (!this.client.configs.pGuilds.includes(guild.id)) await guild.leave();
        }
    }

    async init() {
        if (!this.client.config.main.patreon) return this.disable();
        if (!this.client.configs.schedules.some(schedule => schedule.taskName === this.name)) {
            await this.client.schedule.create("cleanGuilds", "0 0 * * *");
        }
    }

};
