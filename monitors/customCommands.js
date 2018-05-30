const { Monitor } = require("klasa");
const cooldown = new Set();

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { ignoreOthers: false });
    }

    async run(msg) {
        if (!msg.guild || !msg.channel.postable || !msg.guild.configs.customcmds.enabled) return;
        if (!this.client.config.main.patreon) {
            if (msg.guild.members.has("438049470094114816")) return;
        }
        if (!msg.guild.configs.customcmds.cmds.length) return;
        if (cooldown.has(msg.author.id)) return;

        const cmdName = msg.content.slice(msg.guild.configs.prefix.length).trim().split(/ +/g).shift().toLowerCase();
        if (!this.client.commands.has(cmdName)) return;
        const cmd = msg.guild.configs.customcmds.cmds.find(c => c.name === cmdName);
        if (!cmd) return;
        cooldown.add(msg.author.id);
        setTimeout(() => cooldown.delete(msg.author.id), 10000);
        return msg.sendMessage(this.replace(cmd.content, msg));
    }

    replace(content, msg) {
        return content
            .replace(/{GUILD_NAME}/g, msg.member.guild.name)
            .replace(/{USERNAME}/g, msg.member.user.username)
            .replace(/{ID}/g, msg.member.id)
            .replace(/{MENTION}/g, msg.member.toString())
            .replace(/{SERVER}/g, msg.member.guild.name)
            .replace(/{USER}/g, msg.member.user.tag)
            .replace(/{TAG}/g, msg.member.user.tag)
            .replace(/{DISPLAYNAME}/g, msg.member.displayName);
    }

};
