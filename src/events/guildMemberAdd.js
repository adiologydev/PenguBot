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
        return channel.send(this.replaceText(member.guild.settings.messages.join, member));
    }

    autoroles(member) {
        if (!member.guild.settings.toggles.autoroles) return;
        if (!member.guild.me || !member.guild.me.permissions.has("MANAGE_ROLES")) return;
        return member.roles.add(member.guild.settings.autoroles, "PenguBot - AutoRole Feature").catch(() => null);
    }

    replaceText(str, member) {
        return str.replace(/\{(mention|server|server\.id|username|user\.tag|user\.id|id|size|members|count)\}/gi, (__, match) => {
            switch (match.toLowerCase()) {
                case "mention": return member.toString();
                case "server": return member.guild.name;
                case "server.id": return member.guild.id;
                case "username": return member.user.username;
                case "user.tag": return member.user.tag;
                case "user.id":
                case "id": return member.id;
                case "size":
                case "members":
                case "count": return member.guild.memberCount;
                default: return __;
            }
        });
    }

};
