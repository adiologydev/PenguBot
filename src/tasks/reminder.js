const { Task } = require("../index");

module.exports = class extends Task {

    async run({ channel, user, text }) {
        const _channel = this.client.channels.fetch(channel).catch(() => null);
        const _user = await this.client.users.fetch(user).catch(() => null);

        if (_user) return _user.send(`⏰ **Reminder:** ${text}`).catch(() => null);
        if (_channel) return _channel.send(`📘 | <@${user}>, **Reminder:** ${text}`).catch(() => null);
    }

};
