const { Command } = require("../../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["toggleselfrole", "enableselfroles", "disableselfroles"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_TOGGLE_SELFROLES"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const toggle = !msg.guild.settings.toggles.selfroles;
        await msg.guild.settings.update("toggles.selfroles", toggle);
        return msg.sendMessage(`${toggle ? this.client.emotes.check : this.client.emotes.cross} ***${toggle ? msg.language.get("MESSAGE_AUTOROLES_ENABLED") : msg.language.get("MESSAGE_AUTOROLES_DISABLED")}`);
    }

};
