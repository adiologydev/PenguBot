const { Event } = require("klasa");

module.exports = class extends Event {

    async run(channel) {
        if (channel.type !== "text") return;
        this.client.emit("customLogs", channel.guild, "channelDelete", { name: "channels", channel: channel });
    }

};
