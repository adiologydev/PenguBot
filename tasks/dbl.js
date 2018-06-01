const { Task } = require("klasa");

module.exports = class extends Task {

    async run() {
        await this.client.functions.postStats(this.client);
    }

    async init() {
        if (!this.client.configs.schedules.some(schedule => schedule.taskName === this.name)) {
            await this.client.schedule.create("dbl", "*/15 * * * *");
        }
    }

};
