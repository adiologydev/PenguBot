const { Event } = require("klasa");

module.exports = class extends Event {

    async run(messages) {
        const { guild } = messages.first();
        if (!guild) return;
        this.client.emit("customLogs", messages.first().guild, "msgBulkDelete", { channel: messages.first().channel, name: "messages", count: messages.size });
    }


};
