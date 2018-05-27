const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    async run(oldRole, newRole) {
        if (oldRole.id !== newRole.id) return;
        const log = logger("roles", oldRole.guild, `🔄 **${oldRole} role** was \`updated\` in the guild.`);
        const loggingChannel = await oldRole.guild.channels.fetch(oldRole.guild.configs.loggingChannel);
        if (log && loggingChannel) loggingChannel.send(log);
    }

};
