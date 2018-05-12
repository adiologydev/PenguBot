const { Event } = require("klasa");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run(role) {
        const log = this.client.log("roles", role.guild, `❌ **${role.name}** role was \`deleted\` from the guild.`);
        const loggingChannel = role.guild.channels.get(role.guild.configs.loggingChannel);
        if (log) loggingChannel.sendEmbed(log);
    }

};
