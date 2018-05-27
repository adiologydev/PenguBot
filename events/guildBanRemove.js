const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    async run(guild, user) {
        const log = logger("ban", guild, `🔨 **${user.tag}** (${user.id}) was \`unbanned\``);
        const loggingChannel = await guild.channels.fetch(guild.configs.loggingChannel);
        if (log && loggingChannel) loggingChannel.send(log);
    }

};
