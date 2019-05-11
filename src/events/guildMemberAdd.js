const { Event } = require("klasa");
const ServerLog = require("../lib/structures/ServerLog");

module.exports = class extends Event {

    async run(member) {
        await new ServerLog(member.guild)
            .setColor("green")
            .setType("join")
            .setName("Member Joined")
            .setMessage(`📥 ${member.user} (${member.id}) has joined **${member.guild.name}**.`)
            .send();

        await this.welcomeMessage(member);
        await this.autoroles(member);
    }

    welcomeMessage(member) {
        if (!member.guild.settings.toggles.joinmsg) return;
        const channel = member.guild.channels.get(member.guild.settings.channels.join);
        if (!channel) return;
        if (!channel.postable) return;
        return channel.send(this.replace(member.guild.settings.messages.join, member));
    }

    autoroles(member) {
        if (!member.guild.settings.toggles.autoroles) return;
        if (!member.guild.me || !member.guild.me.permissions.has("MANAGE_ROLES")) return;
        return member.roles.add(member.guild.settings.autoroles, "PenguBot - AutoRole Feature").catch(() => null);
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
