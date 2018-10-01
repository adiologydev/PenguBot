const Command = require("../../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            guarded: true,
            aliases: ["enablecmd", "disablecommand", "enablecommand", "togglecommand"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_TOGGLE_COMMAND_DESCRPTION"),
            usage: "<command:cmd>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [cmd]) {
        if (msg.guild.settings.disabledCommands.indexOf(cmd) === -1) {
            await msg.guild.settings.update("disabledCommands", cmd.name, { action: "add" });
            return msg.sendMessage(`${this.client.emotes.check} ***${cmd.name} command has been Disabled by ${msg.author.tag}!***`);
        } else {
            await msg.guild.settings.update("disabledCommands", cmd.name, { action: "remove" });
            return msg.sendMessage(`${this.client.emotes.check} ***${cmd.name} command has been Enabled by ${msg.author.tag}!***`);
        }
    }

};
