const { Task, config } = require("../index");

module.exports = class extends Task {

    run() {
        return Promise.all(this.client.guilds.filter(g => !this.client.settings.get("pGuilds").includes(g.id)).map(g => g.leave()));
    }

    init() {
        if (this.client.user.id === "303181184718995457" || !config.patreon) return this.disable();
    }

};
