const { Task } = require("../index");

module.exports = class extends Task {

    run() {
        return Promise.all(this.client.guilds.filter(g => !this.client.settings.pGuilds.includes(g.id)).map(g => g.leave()));
    }

    async init() {
        if (this.client.user.id === "303181184718995457" || !this.client.config.main.patreon) return this.disable();
        if (!this.client.settings.schedules.some(schedule => schedule.taskName === this.name)) {
            await this.client.schedule.create("cleanGuilds", "0 0 * * *");
        }
    }

};
