const { Event } = require("klasa");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run(guild, user) {
        const log = this.client.log("ban", guild, `🔨 **${user.tag}** (${user.id}) was \`unbanned\``);
        const loggingChannel = guild.channels.get(guild.configs.loggingChannel);
        if (!log) return;
        return loggingChannel.sendEmbed(log);
    }

};
