const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run(oldRole, newRole) {
        if (oldRole.id !== newRole.id) return;
        const log = logger("roles", oldRole.guild, `🔄 **${oldRole} role** was \`updated\` in the guild.`);
        const loggingChannel = oldRole.guild.channels.get(oldRole.guild.configs.loggingChannel);
        if (log) loggingChannel.sendEmbed(log);
    }

};
