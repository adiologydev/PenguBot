const { Event } = require("klasa");

module.exports = class extends Event {

    async run(member) {
        // Logging
        this.client.emit("customLogs", member.guild, "leave", { name: "leave" }, member.user);

        await this.leaveMessage(member);
    }

    leaveMessage(member) {
        if (!member.guild.settings.messages.leave.enabled) return;
        const channel = member.guild.channels.get(member.guild.settings.messages.leave.channel);
        if (!channel || (channel && !channel.postable)) return;
        return channel.send(this.replace(member.guild.settings.messages.leave.message, member));
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
