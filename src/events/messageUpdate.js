const { Event } = require("klasa");

module.exports = class extends Event {

    async run(oldMessage, newMessage) {
        if (this.client.ready && oldMessage.content !== newMessage.content) this.client.monitors.run(newMessage);
        if (!oldMessage.guild || oldMessage.author.bot || oldMessage.content === newMessage.content) return;

        this.client.emit("customLogs", oldMessage.guild, "msgUpdate", { channel: oldMessage.channel, name: "messages", oldContent: oldMessage.content, newContent: newMessage.content }, oldMessage.author);
    }

};
