const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    async run(guild, user) {
        const log = logger("ban", guild, `🔨 **${user.tag}** (${user.id}) was \`unbanned\``);
        const loggingChannel = guild.channels.get(guild.configs.loggingChannel);
        if (!log || !loggingChannel) return;
        return loggingChannel.sendEmbed(log);
    }

};
