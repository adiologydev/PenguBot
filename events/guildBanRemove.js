const { Event } = require("klasa");

module.exports = class extends Event {

    async run(guild, user) {
        this.client.emit("customLogs", guild, "unban", { name: "ban" }, user);
    }

};
