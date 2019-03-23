const { Event } = require("klasa");
const { Parser } = require("breadtags");
const fs = require("fs-nextra");

const timeout = new Set();

module.exports = class extends Event {

    async run(msg, command, prefixLength) {
        if (!msg.guild || !msg.guildSettings.customcmds.cmds.length) return;
        await msg.guild.settings.sync(true);
        const customCommand = msg.guildSettings.customcmds.cmds.find(c => c.name.toLowerCase() === command);
        if (!customCommand) return;

        if (timeout.has(`${msg.author.id}-${msg.guild.id}`)) return msg.reply(`${this.client.emotes.cross} **Ooh, Not So Quickly. Please Wait and Try Again!`);

        const args = msg.content.slice(prefixLength).trim().split(" ").slice(1);
        const parsed = await this.parser.parse(customCommand.content, {
            guild: msg.guild,
            user: msg.author,
            member: msg.member,
            channel: msg.channel,
            args
        }).catch(e => e);

        if (typeof parsed === Error) {
            throw `Hey, there was an Error with this Custom Command's Content. Please Screenshot the following error and Share in <https://pengubot.com/support>\n\n**Error Stack:**\`\`\`${parsed}\`\`\``;
        }

        if (!parsed || !parsed.length) return;
        await msg.channel.send(parsed);
        timeout.add(`${msg.author.id}-${msg.guild.id}`);
        setTimeout(() => timeout.delete(`${msg.author.id}-${msg.guild.id}`), 3500);
        return;
    }

    async init() {
        this.parser = new Parser({ throwErrors: true });
        const files = await fs.readdir("./lib/tags");
        for (const file of files) {
            if (file.includes("index")) continue;
            Parser.loadTag(require(`./lib/tags/${file}`));
        }
    }

};
