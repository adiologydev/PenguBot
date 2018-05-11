const { Event } = require("klasa");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run(member) {
        const guild = member.guild; // eslint-disable-line
        if (!guild.configs.get("leave-messages") === false) {
            if (guild.channels.exists("id", guild.configs.get("leave-channel"))) {
                const channel = guild.channels.find("id", guild.configs.get("leave-channel"));
                if (channel.permissionsFor(guild.me).has(["SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES"])) {
                    if (member.guild.configs.get("leave-text") === null) { member.guild.configs.update("leave-text", "It's sad to see you leave {USERNAME}, hope to see you again."); }
                    try {
                        channel.send(this.replace(guild.configs.get("leave-text"), member));
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        }

        // Logging
        const log = this.client.log("leave", guild, `📤 **${member.user.tag}** (${member.user.id}) has \`left\` the guild.\n**Total Members:** ${guild.members.size}`);
        const loggingChannel = member.guild.channels.get(member.guild.configs.loggingChannel);
        if (log) loggingChannel.sendEmbed(log);
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
            .replace(/{TAG}/g, member.user.tag)
            .replace(/{DISPLAYNAME}/g, member.displayName);
    }

};
