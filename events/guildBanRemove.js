const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run(guild, user) {
        const log = logger("ban", guild, `🔨 **${user.tag}** (${user.id}) was \`unbanned\``);
        const loggingChannel = guild.channels.get(guild.configs.loggingChannel);
        if (!log) return;
        return loggingChannel.sendEmbed(log);
    }

};
