const Command = require("../../../lib/structures/KlasaCommand");

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
        if (msg.guild.settings.get("selfroles.enabled") === false) {
            return msg.guild.settings.update("autoroles.enabled", true).then(() => {
                msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_AUTOROLES_ENABLED")}***`);
            });
        } else {
            return msg.guild.settings.update("selfroles.enabled", false).then(() => {
                msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_AUTOROLES_DISABLED")}***`);
            });
        }
    }

};
