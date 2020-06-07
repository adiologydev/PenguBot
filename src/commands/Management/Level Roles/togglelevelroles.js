const { Command } = require("../../../index");

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
        const toggle = !msg.guild.settings.get("toggles.levelroles");
        await msg.guild.settings.update("toggles.levelroles", toggle);
        return msg.sendMessage(`${toggle ? this.client.emotes.check : this.client.emotes.cross} ***${toggle ? msg.language.get("MESSAGE_LEVELROLES_ENABLED") : msg.language.get("MESSAGE_LEVELROLES_DISABLED")}`);
    }

};
