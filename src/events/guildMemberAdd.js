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
        if (!member.guild.settings.get("toggles.joinmsg")) return;
        const channel = member.guild.channels.get(member.guild.settings.get("channels.join"));
        if (!channel) return;
        if (!channel.postable) return;
        return channel.send(this.replaceText(member.guild.settings.get("messages.join"), member));
    }

    autoroles(member) {
        if (!member.guild.settings.get("toggles.autoroles")) return;
        if (!member.guild.me || !member.guild.me.permissions.has("MANAGE_ROLES")) return;

        const roles = member.guild.settings.get("autoroles");
        const fetchedRoles = [];
        for (const role of roles) {
            if (!member.guild.roles.has(role)) continue;
            if (role.position >= member.guild.me.roles.highest.position) continue;
            fetchedRoles.push(member.guild.roles.get(role));
        }

        return member.roles.add(fetchedRoles, "PenguBot.com - Autorole Feature").catch(() => null);
    }

    replaceText(str, member) {
        return str.replace(/\{(mention|guild_name|server|server\.id|username|user\.tag|user\.id|user|displayname|id|size|members|count)\}/gi, (__, match) => {
            switch (match.toLowerCase()) {
                case "mention": return member.toString();
                case "guild_name":
                case "server": return member.guild.name;
                case "server.id": return member.guild.id;
                case "user":
                case "displayname":
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
