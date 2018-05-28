const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["changecmd"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["customcmds.cmds"],
            description: msg => msg.language.get("COMMAND_ADD_CMD_DESCRIPTION"),
            usage: "<name:string> <content:string> [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [name, ...content]) {
        if (this.client.commands.has(name)) return msg.reply(`<:penguError:435712890884849664> ***\`${name}\` ${msg.language.get("MESSAGE_CMD_EXISTS")}***`);
        const cmd = msg.guild.configs.customcmds.cmds.find(c => c.name === name);
        if (cmd) {
            await msg.guild.configs.update("customcmds.cmds", cmd, { action: "remove" }).then(() => {
                msg.guild.configs.update("customcmds.cmds", { content: content.join(" "), name: cmd.name }, { action: "add" });
            });
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***\`${name}\` ${msg.language.get("MESSAGE_CMD_UPDATED")} ${msg.author.tag}!***`);
        } else {
            return msg.reply(`<:penguError:435712890884849664> ***\`${name}\` ${msg.language.get("MESSAGE_CMD_NOTFOUND")}***`);
        }
    }

};
