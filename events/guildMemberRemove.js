const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    async run(member) {
        // Logging
        const log = logger("leave", member.guild, `📤 **${member.user.tag}** (${member.user.id}) has \`left\` the guild.\n**Total Members:** ${member.guild.memberCount}`);
        const loggingChannel = member.guild.channels.get(member.guild.configs.loggingChannel);
        if (log && loggingChannel) await loggingChannel.send(log);

        await this.leaveMessage(member);
    }

    leaveMessage(member) {
        if (!member.guild.configs.messages.leave.enabled) return;
        const channel = member.guild.channels.get(member.guild.configs.messages.leave.channel);
        if (!channel || (channel && !channel.postable)) return;
        return channel.send(this.replace(member.guild.configs.messages.leave.message, member));
    }

    async init() {
        if (!this.client.gateways.guilds.schema.logs.has("leave")) {
            this.client.gateways.guilds.schema.logs.add("leave", { type: "boolean", default: false });
        }
    }

    replace(text, member) {
        return text
            .replace(/{GUILD_NAME}/g, member.guild.name)
            .replace(/{USERNAME}/g, member.user.username)
            .replace(/{DISPLAYNAME}/g, member.displayName)
            .replace(/{ID}/g, member.id)
            .replace(/{MENTION}/g, member.toString())
            .replace(/{SERVER}/g, member.guild.name)
            .replace(/{USER}/g, member.user.tag)
            .replace(/{TAG}/g, member.user.tag);
    }

};
