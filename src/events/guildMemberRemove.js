const { Event } = require("klasa");
const ServerLog = require("../lib/structures/ServerLog");

module.exports = class extends Event {

    async run(member) {
        await new ServerLog(member.guild)
            .setColor("red")
            .setType("leave")
            .setName("Member Joined")
            .setMessage(`📤 ${member.user} (${member.id}) has left **${member.guild.name}**.`)
            .send();

        await this.leaveMessage(member);
    }

    leaveMessage(member) {
        if (!member.guild.settings.toggles.leavemsg) return;
        const channel = member.guild.channels.get(member.guild.settings.channels.leave);
        if (!channel || (channel && !channel.postable)) return;
        return channel.send(this.replace(member.guild.settings.messages.leave, member));
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
