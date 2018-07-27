const { Monitor } = require("klasa");

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            ignoreOthers: false,
            ignoreBots: true,
            ignoreSelf: true
        });
        this.cooldown = new Set();
    }

    async run(msg) {
        if (!msg.guild || !msg.channel.postable || !msg.guild.configs.customcmds.enabled) return;
        if (!msg.guild.configs.customcmds.cmds.length) return;
        if (this.cooldown.has(msg.author.id)) return;

        const member = await msg.guild.members.fetch(msg.author.id).catch(() => null);
        if (!member) return;

        if (this.client.user.id !== "303181184718995457") {
            const mainBot = await msg.guild.members.fetch("303181184718995457").catch(() => null);
            if (mainBot) return;
        }

        if (!msg.content.startsWith(msg.guild.configs.prefix)) return;

        const cmdName = msg.content.slice(msg.guild.configs.prefix.length).trim().split(/ +/g).shift().toLowerCase();
        if (this.client.commands.has(cmdName)) return;
        const cmd = msg.guild.configs.customcmds.cmds.find(c => c.name === cmdName);
        if (!cmd) return;
        this.cooldown.add(msg.author.id);
        setTimeout(() => this.cooldown.delete(msg.author.id), 8000);
        return msg.sendMessage(this.replace(cmd.content, msg));
    }

    replace(content, msg) {
        return content
            .replace(/{GUILD_NAME}/g, msg.guild.name)
            .replace(/{USERNAME}/g, msg.author.username)
            .replace(/{ID}/g, msg.author.id)
            .replace(/{MENTION}/g, msg.author.toString())
            .replace(/{SERVER}/g, msg.guild.name)
            .replace(/{USER}/g, msg.author.tag)
            .replace(/{TAG}/g, msg.author.tag)
            .replace(/{DISPLAYNAME}/g, msg.member.displayName);
    }

};
