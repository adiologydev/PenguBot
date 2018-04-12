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
        if (guild.configs.get("leave-messages") === false) return;
        if (!guild.channels.exists("id", guild.configs.get("leave-channel"))) return;
        const channel = guild.channels.find("id", guild.configs.get("leave-channel"));
        if (!member.guild.configs.get("leave-text")) { member.guild.configs.update("leave-text", "It's sad to see you leave {USERNAME}, hope to see you again."); }

        try {
            channel.send(this.replace(guild.configs.get("leave-text"), member));
        } catch (e) {
            console.error(e);
        }
    }

    replace(text, member) {
        return text
            .replace(/{MENTION}/g, `<@${member.id}>`)
            .replace(/{GUILD_NAME}/g, member.guild.name)
            .replace(/{USERNAME}/g, member.user.username)
            .replace(/{DISPLAYNAME}/g, member.displayName)
            .replace(/{ID}/g, member.id);
    }

};
