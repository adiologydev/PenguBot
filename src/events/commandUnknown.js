const { Event } = require("klasa");
const Parser = require("breadtags");

const timeout = new Set();

module.exports = class extends Event {

    async run(msg, command, prefixLength) {
        if (!msg.guild || !msg.guildSettings.customcmds.cmds.length) return;
        await msg.guild.settings.sync(true);
        const customCommand = msg.guildSettings.customcmds.cmds.find(c => c.name.toLowerCase() === command);
        if (!customCommand) return;

        if (timeout.has(`${msg.author.id}-${msg.guild.id}`)) return msg.reply(`${this.client.emotes.cross} **Ooh, Not so quickly. Please wait and try again!**`);

        const args = msg.content.slice(prefixLength).trim().split(" ").slice(1);
        const parsed = await this.parser.parse(customCommand.content, {
            guild: msg.guild,
            user: msg.author,
            member: msg.member,
            channel: msg.channel,
            args
        });
        await msg.channel.send(parsed);
        timeout.add(`${msg.author.id}-${msg.guild.id}`);
        setTimeout(() => timeout.delete(`${msg.author.id}-${msg.guild.id}`), 3500);
        return;
    }

    async init() {
        this.parser = new Parser();
        this.parser.loadAll(`${process.cwd()}/lib/tags`);
    }

};
