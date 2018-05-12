const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run(oldMessage, newMessage) {
        if (!oldMessage.guild) return;
        if (oldMessage.author.id === this.client.user.id) return;
        const log = logger("messages", oldMessage.guild, `🔄 **Message by ${oldMessage.member}** was \`updated\` in <#${oldMessage.channel.id}>\n**Before:**\n${oldMessage.content}\n**After:**\n${newMessage.content}`);
        const loggingChannel = oldMessage.guild.channels.get(oldMessage.guild.configs.loggingChannel);
        if (log) loggingChannel.sendEmbed(log);
    }

};
