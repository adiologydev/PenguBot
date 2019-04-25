const Command = require("../../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["togglelevelrole", "enablelevelroles", "disablelevelroles"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_TOGGLE_LVLROLES_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild.settings.get("levelroles.enabled") === false) {
            return msg.guild.settings.update("autoroles.enabled", true).then(() => {
                msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_LEVELROLES_ENABLED")}***`);
            });
        } else {
            return msg.guild.settings.update("levelroles.enabled", false).then(() => {
                msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_LEVELROLES_DISABLED")}***`);
            });
        }
    }

};
