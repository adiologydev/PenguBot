const { Event } = require("klasa");
const { Parser } = require("breadtags");

module.exports = class extends Event {

    async run(msg, command, prefixLength) {
        if (!msg.guild || !msg.guildSettings.customcmds.cmds.length) return;
        const customCommand = msg.guildSettings.customcmds.cmds.find(c => c.name.match(new RegExp(command, "i")));
        if (!customCommand) return;
        const args = msg.content.slice(prefixLength).trim().split(" ").slice(1);
        const parsed = await this.parser.parse(customCommand.content, {
            guild: msg.guild,
            user: msg.author,
            member: msg.member,
            channel: msg.channel,
            args
        });
        await msg.channel.send(parsed);
        return;
    }

    async init() {
        this.parser = new Parser();
    }

};
