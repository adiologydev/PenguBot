const { Event } = require("klasa");

module.exports = class extends Event {

    async run(oldRole, newRole) {
        if (oldRole.id !== newRole.id) return;
        if (oldRole.position !== newRole.position) return;
        this.client.emit("customLogs", oldRole.guild, "roleUpdate", { role: oldRole, name: "roles" });
    }

};
