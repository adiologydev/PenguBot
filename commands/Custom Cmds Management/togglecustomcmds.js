const { Command } = require("klasa");

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
                msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_COMMAND_CUSTOM_ENABLED")}***`);
            });
        } else {
            return msg.guild.settings.update("customcmds.enabled", false).then(() => {
                msg.sendMessage(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_COMMAND_CUSTOM_DISABLED")}***`);
            });
        }
    }

};
