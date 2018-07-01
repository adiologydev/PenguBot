const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    async run(member) {
        // Logging
        const log = logger("join", member.guild, `📥 **${member.user.tag}** (${member.user.id}) has \`joined\` the guild.\n**Total Members:** ${member.guild.memberCount}`);
        const loggingChannel = member.guild.channels.get(member.guild.configs.loggingChannel);
        if (log && loggingChannel) await loggingChannel.send(log);

        await this.welcomeMessage(member);
        await this.autoroles(member);
    }

    welcomeMessage(member) {
        if (!member.guild.configs.messages.welcome.enabled) return;
        const channel = member.guild.channels.get(member.guild.configs.messages.welcome.channel);
        if (!channel) return;
        return channel.send(this.replace(member.guild.configs.messages.welcome.message, member));
    }

    autoroles(member) {
        if (!member.guild.configs.autoroles.enabled) return;
        if (!member.guild.me.permissions.has("MANAGE_ROLES")) return;
        return member.roles.add(member.guild.configs.autoroles.roles, "PenguBot - AutoRole Feature");
    }

    async init() {
        if (!this.client.gateways.guilds.schema.logs.has("join")) {
            this.client.gateways.guilds.schema.logs.add("join", { type: "boolean", default: false });
        }
    }

    replace(text, member) {
        return text
            .replace(/{GUILD_NAME}/g, member.guild.name)
            .replace(/{USERNAME}/g, member.user.username)
            .replace(/{DISPLAYNAME}/g, msg.member.nickname ? msg.member.nickname : msg.author.username)
            .replace(/{ID}/g, member.id)
            .replace(/{MENTION}/g, member.toString())
            .replace(/{SERVER}/g, member.guild.name)
            .replace(/{USER}/g, member.user.tag)
            .replace(/{TAG}/g, member.user.tag);
    }

};
