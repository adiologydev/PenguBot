const { Event } = require("klasa");

module.exports = class extends Event {

    async run(member) {
        // Logging
        this.client.emit("customLogs", member.guild, "join", { name: "join" }, member.user);

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
            .replace(/{DISPLAYNAME}/g, member.displayName)
            .replace(/{ID}/g, member.id)
            .replace(/{MENTION}/g, member.toString())
            .replace(/{SERVER}/g, member.guild.name)
            .replace(/{USER}/g, member.user.tag)
            .replace(/{TAG}/g, member.user.tag);
    }

};
