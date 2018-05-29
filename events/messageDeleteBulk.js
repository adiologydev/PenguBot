const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    async run(messages) {
        const { guild } = messages.first();
        if (!guild) return;
        const log = logger("messages", guild, `❌ **${messages.size} messages** were \`deleted\` in <#${messages.first().channel.id}>`);
        const loggingChannel = guild.channels.get(guild.configs.loggingChannel);
        if (log && loggingChannel) await loggingChannel.send(log);
    }


};
