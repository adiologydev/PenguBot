const { Task } = require("klasa");

module.exports = class extends Task {

    async run({ channel, user, text }) {
        const _channel = this.client.channels.get(channel);
        return _channel.send(`📘 | <@${user}>, ***Reminder:*** ${text}`);
    }

};
