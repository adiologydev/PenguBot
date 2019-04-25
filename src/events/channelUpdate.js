const { Event } = require("klasa");

module.exports = class extends Event {

    async run(oldChannel, newChannel) {
        if (oldChannel.type !== "text") return;
        if (oldChannel.id !== newChannel.id) return;
        if (!oldChannel.position !== newChannel.id) return;
        this.client.emit("customLogs", oldChannel.guild, "channelUpdate", { name: "channels", channel: oldChannel });
    }

};
