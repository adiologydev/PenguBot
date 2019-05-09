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
        const toggle = !msg.guild.settings.toggles.customcmds;
        await msg.guild.settings.update("toggles.customcmds", toggle);
        return msg.sendMessage(`${toggle ? this.client.emotes.check : this.client.emotes.cross} ***${toggle ? msg.language.get("MESSAGE_COMMAND_CUSTOM_ENABLED") : msg.language.get("MESSAGE_COMMAND_CUSTOM_DISABLED")}`);
    }

};
