const { Event } = require("klasa");

module.exports = class extends Event {

    async run(oldRole, newRole) {
        if (oldRole.id !== newRole.id) return;
        this.client.emit("customLogs", oldRole.guild, "roleUpdate", { role: oldRole, name: "roles" });
    }

};
