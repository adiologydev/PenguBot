const { Event } = require("klasa");

module.exports = class extends Event {

    async run(role) {
        this.client.emit("customLogs", role.guild, "roleCreate", { role: role, name: "roles" });
    }

    async init() {
        if (!this.client.gateways.guilds.schema.logs.has("roles")) {
            this.client.gateways.guilds.schema.logs.add("roles", { type: "boolean", default: false });
        }
    }

};
