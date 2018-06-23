const { Task } = require("klasa");

module.exports = class extends Task {

    async run() {
        this.client.health.cmd.cmdCount.shift();
        this.client.health.cmd.cmdCount.push(this.client.health.commands.temp);
        this.client.health.commands.tempCount = {
            count: 0,
            ran: {}
        };
    }

    async init() {
        if (!this.client.configs.schedules.some(task => task.taskName === this.name)) {
            await this.client.schedule.create(this.name, "*/1 * * * *");
        }
    }

};
