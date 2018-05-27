const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    async run(role) {
        const log = logger("roles", role.guild, `❌ **${role.name}** role was \`deleted\` from the guild.`);
        const loggingChannel = await role.guild.channels.fetch(role.guild.configs.loggingChannel);
        if (log && loggingChannel) loggingChannel.send(log);
    }

};
