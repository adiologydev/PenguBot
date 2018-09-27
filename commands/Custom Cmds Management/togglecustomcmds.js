const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["tccmd", "togglecustom", "tcmd", "togglecustomcommands"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_TOGGLE_CUSTOM_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild.settings.get("customcmds.enabled") === false) {
            return msg.guild.settings.update("customcmds.enabled", true).then(() => {
                msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_COMMAND_CUSTOM_ENABLED")}***`);
            });
        } else {
            return msg.guild.settings.update("customcmds.enabled", false).then(() => {
                msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_COMMAND_CUSTOM_DISABLED")}***`);
            });
        }
    }

};
