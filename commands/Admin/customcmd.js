const Command = require("../../lib/structures/KlasaCommand");
const { RichDisplay, util } = require("klasa");
const { MessageEmbed, Permissions } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["cc", "customcommands"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_CUSTOM_CMD_DESCRIPTION"),
            usage: "<create|delete|toggle|list:default> <name:string> <content:string> [...]",
            subcommands: true,
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async create(msg, [name, ...content]) {
        if (this.client.commands.has(name)) return msg.reply(`${this.client.emotes.cross} ***\`${name}\` ${msg.language.get("MESSAGE_CMD_EXISTS")}***`);
        const cmd = msg.guild.settings.customcmds.cmds.find(c => c.name === name);
        if (cmd) return msg.reply(`${this.client.emotes.cross} ***\`${name}\` ${msg.language.get("MESSAGE_CMD_EXISTS")}***`);
        await msg.guild.settings.update("customcmds.cmds", { content: content.join(" "), name: name, action: "add" });
        return msg.sendMessage(`${this.client.emotes.check} ***\`${name}\` ${msg.language.get("MESSAGE_CMD_ADDED")} ${msg.author.tag}!***`);
    }

    async delete(msg, [name]) {
        const cmd = msg.guild.settings.customcmds.cmds.find(c => c.name === name);
        if (!cmd) return msg.reply(`${this.client.emotes.cross} ***\`${name}\` ${msg.language.get("MESSAGE_CMD_NOTFOUND")}***`);
        await msg.guild.settings.update("customcmds.cmds", cmd, { action: "remove" });
        return msg.sendMessage(`${this.client.emotes.check} ***\`${name}\` ${msg.language.get("MESSAGE_CMD_REMOVED")} ${msg.author.tag}!***`);
    }

    async toggle(msg) {
        if (!msg.guild.settings.customcmds.enabled) {
            return msg.guild.settings.update("customcmds.enabled", true).then(() => {
                msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_COMMAND_CUSTOM_ENABLED")}***`);
            });
        } else {
            return msg.guild.settings.update("customcmds.enabled", false).then(() => {
                msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_COMMAND_CUSTOM_DISABLED")}***`);
            });
        }
    }

    async update(msg, [name, ...content]) {
        if (this.client.commands.has(name)) return msg.reply(`${this.client.emotes.cross} ***\`${name}\` ${msg.language.get("MESSAGE_CMD_EXISTS")}***`);
        const cmd = msg.guild.settings.customcmds.cmds.find(c => c.name === name);
        if (cmd) {
            await msg.guild.settings.update("customcmds.cmds", cmd, { action: "remove" }).then(() => {
                msg.guild.settings.update("customcmds.cmds", { content: content.join(" "), name: cmd.name }, { action: "add" });
            });
            return msg.sendMessage(`${this.client.emotes.check} ***\`${name}\` ${msg.language.get("MESSAGE_CMD_UPDATED")} ${msg.author.tag}!***`);
        } else {
            return msg.reply(`${this.client.emotes.cross} ***\`${name}\` ${msg.language.get("MESSAGE_CMD_NOTFOUND")}***`);
        }
    }

    async list(msg) {
        if (msg.guild.settings.customcmds.cmds[0] === undefined) return msg.reply(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_NO_CMDS")}***`);
        const { prefix } = msg.guild.settings;
        const names = msg.guild.settings.customcmds.cmds.map(cmd => cmd.name);
        const PERMISSIONS_RICHDISPLAY = new Permissions([Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.ADD_REACTIONS, Permissions.FLAGS.EMBED_LINKS]);
        if (msg.channel.permissionsFor(this.client.user).has(PERMISSIONS_RICHDISPLAY)) {
            const cmds = new RichDisplay(new MessageEmbed()
                .setTitle("Use the reactions to change pages, select a page or stop viewing the commands.")
                .setAuthor("Custom Commands - PenguBot", "https://i.imgur.com/DOuCQlY.png")
                .setDescription("Scroll between pages to see the custom commands list.")
                .setColor("#F75F4E")
            );
            for (let i = 0, temp = names.length; i < temp; i += 5) {
                const curr = names.slice(i, i + 5);
                cmds.addPage(t => t.setDescription(curr.map(c => `• ${prefix}${c}`)));
            }
            cmds.run(await msg.sendMessage(`${this.client.emotes.loading} Loading Commands...`), {
                time: 120000,
                filter: (reaction, user) => user === msg.author
            });
        } else {
            const message = `** Custom Commands ** for ${msg.guild.name} \n ${util.codeBlock(names.map(name => `• ${prefix}${name}`).join("\n"))}`;
            msg.sendMessage(message);
        }
    }


};
