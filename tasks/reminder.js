const { Task } = require("klasa");

module.exports = class extends Task {

    async run({ channel, user, text }) {
        const _channel = this.client.channels.get(channel);
        try {
            return user.send(`⏰ **Reminder:** ${text}`);
        } catch (e) {
            return _channel.send(`📘 | <@${user.id}>, **Reminder:** ${text}`);
        }
    }

};
