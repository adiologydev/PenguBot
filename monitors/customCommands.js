const { Monitor } = require("klasa");
const cooldown = new Set();

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { ignoreOthers: false });
    }

    async run(msg) {
        if (!msg.guild) return;
        if (!msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES"])) return;
        if (!msg.guild.configs.get("customcmds")) return;
        if (cooldown.has(msg.author.id)) return;
        if (msg.guild.configs.get("custom-commands") === false) return;

        const base = msg.content.split(msg.guild.configs.get("prefix"));
        const cmdName = base[1];
        if (!this.client.commands.has(cmdName)) {
            const cmd = msg.guild.configs.customcmds.find(c => c.name === cmdName);
            if (!cmd) return;
            if (cmd.name === cmdName) {
                cooldown.add(msg.author.id);
                setTimeout(() => cooldown.delete(msg.author.id), 10000);
                return msg.channel.send(this.replace(cmd.content, msg));
            }
        }
    }

    replace(content, msg) {
        return content
            .replace(/{GUILD_NAME}/g, msg.member.guild.name)
            .replace(/{USERNAME}/g, msg.member.user.username)
            .replace(/{DISPLAYNAME}/g, msg.member.displayName)
            .replace(/{ID}/g, msg.member.id)
            .replace(/{MENTION}/g, msg.member.toString())
            .replace(/{SERVER}/g, msg.member.guild.name)
            .replace(/{USER}/g, msg.member.user.tag)
            .replace(/{TAG}/g, msg.member.user.tag)
            .replace(/{DISPLAYNAME}/g, msg.member.displayName);
    }

};
