const { Event } = require("klasa");
const Parser = require("breadtags");
const { join } = require("path");

const timeout = new Set();

module.exports = class extends Event {

    async run(msg, command, prefixLength) {
        if (!msg.guild || !msg.guild.settings.get("customcmds.length")) return;
        await msg.guild.settings.sync(true);
        command = command.toLowerCase();
        const customCommand = msg.guild.settings.get("customcmds").find(c => c.name.toLowerCase() === command);
        if (!customCommand) return;

        if (timeout.has(`${msg.author.id}-${msg.guild.id}`)) return msg.sendMessage(`${this.client.emotes.cross} **Ooh, Not so quickly. Please wait and try again!**`);

        const args = msg.content.slice(prefixLength).trim().split(" ").slice(1);
        const parsed = await this.parser.parse(customCommand.content, {
            guild: msg.guild,
            user: msg.author,
            member: msg.member,
            channel: msg.channel,
            args
        });

        await msg.channel.send(parsed ? parsed : customCommand.content);
        timeout.add(`${msg.author.id}-${msg.guild.id}`);
        setTimeout(() => timeout.delete(`${msg.author.id}-${msg.guild.id}`), 3500);
        return;
    }

    async init() {
        this.parser = new Parser();
        this.parser.loadAll(join(__dirname, "..", "lib", "tags"));
    }

};
