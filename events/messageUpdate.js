const { Event } = require("klasa");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run(oldMessage, newMessage) {
        if (oldMessage.member.user.id === this.client.user.id) return;
        if (!oldMessage.guild) return;
        const log = this.client.log("messages", oldMessage.guild, `🔄 **Message by ${oldMessage.member}** was \`updated\` in <#${oldMessage.channel.id}>\n**Before:**\n${oldMessage.content}\n**After:**\n${newMessage.content}`);
        const loggingChannel = oldMessage.guild.channels.get(oldMessage.guild.configs.loggingChannel);
        if (log) loggingChannel.sendEmbed(log);
    }

};
