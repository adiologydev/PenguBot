const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    async run(member) {
        // Welcome Messages
        const guild = member.guild; // eslint-disable-line
        if (guild.configs.messages.welcome.enabled) {
            if (guild.channels.get(guild.configs.messages.welcome.channel)) {
                const channel = guild.channels.get(guild.configs.messages.welcome.channel);
                if (channel && channel.permissionsFor(guild.me).has(["SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES"])) {
                    if (!guild.configs.messages.welcome.message) { await member.guild.configs.update("messages.welcome.message", "Welcome {MENTION} to {GUILD_NAME}, we hope you enjoy your stay!"); }
                    try {
                        await channel.send(this.replace(guild.configs.messages.welcome.message, member));
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        }

        // Logging
        const log = logger("join", guild, `📥 **${member.user.tag}** (${member.user.id}) has \`joined\` the guild.\n**Total Members:** ${guild.memberCount}`);
        const loggingChannel = guild.channels.get(guild.configs.loggingChannel);
        if (log && loggingChannel) loggingChannel.send(log);

        // Auto Roles
        if (guild.configs.autoroles.enabled) {
            if (guild.me.permissions.has("MANAGE_MEMBERS")) {
                const { roles } = guild.configs.autoroles;
                if (!roles) return;
                try {
                    await member.roles.add(roles, "Auto Roles");
                } catch (e) {
                    console.error(e);
                }
            }
        }
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
            .replace(/{DISPLAYNAME}/g, member.displayName)
            .replace(/{ID}/g, member.id)
            .replace(/{MENTION}/g, member.toString())
            .replace(/{SERVER}/g, member.guild.name)
            .replace(/{USER}/g, member.user.tag)
            .replace(/{TAG}/g, member.user.tag)
            .replace(/{DISPLAYNAME}/g, member.displayName);
    }

};
