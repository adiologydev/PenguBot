const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    async run(oldMessage, newMessage) {
        if (this.client.ready && oldMessage.content !== newMessage.content) this.client.monitors.run(newMessage);
        if (!oldMessage.guild || oldMessage.author.bot || oldMessage.content === newMessage.content) return;

        const log = logger("messages", oldMessage.guild, `🔄 **Message by ${oldMessage.member}** was \`updated\` in <#${oldMessage.channel.id}>\n**Before:**\n${oldMessage.content}\n**After:**\n${newMessage.content}`, `${oldMessage.author.tag} (${oldMessage.author.id})`, oldMessage.author.displayAvatarURL()); // eslint-disable-line
        const loggingChannel = oldMessage.guild.channels.get(oldMessage.guild.configs.loggingChannel);
        if (log && loggingChannel) await loggingChannel.send(log);
    }

};
