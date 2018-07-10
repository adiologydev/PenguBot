const { Event } = require("klasa");

module.exports = class extends Event {

    async run(guild, user) {
        this.client.emit("customLogs", guild, "ban", { name: "ban" }, user);
    }

    async init() {
        if (!this.client.gateways.guilds.schema.logs.has("ban")) {
            this.client.gateways.guilds.schema.logs.add("ban", { type: "boolean", default: false });
        }
    }

};
