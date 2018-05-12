const { Event } = require("klasa");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run(messages) {
        const guild = messages.first().guild; // eslint-disable-line
        if (!guild) return;
        const log = this.client.log("messages", guild, `❌ **${messages.array().length} messages** were \`deleted\` in <#${messages.first().channel.id}>`);
        const loggingChannel = guild.channels.get(guild.configs.loggingChannel);
        if (log) loggingChannel.sendEmbed(log);
    }


};
