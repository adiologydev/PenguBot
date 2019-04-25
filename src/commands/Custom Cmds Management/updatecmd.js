const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["changecmd"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_ADD_CMD_DESCRIPTION"),
            usage: "<name:string> <content:string> [...]",
            usageDelim: " ",
            extendedHelp: "More Information can be Found Here: https://bit.ly/PenguCustomCommands"
        });
    }

    async run(msg, [name, ...content]) {
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

};
