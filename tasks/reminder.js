const { Task } = require("klasa");

module.exports = class extends Task {

    async run({ channel, user, text }) {
        const _channel = this.client.channels.get(channel);
        const _user = await this.client.users.fetch(user).catch(() => null);
        if (_user && _user.send) await _user.send(`⏰ **Reminder:** ${text}`).catch(() => null);
        else await _channel.send(`📘 | ${_user}, **Reminder:** ${text}`).catch(() => null);
    }

};
