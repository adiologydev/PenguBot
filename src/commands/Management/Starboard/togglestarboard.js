const { Command } = require("../../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["tsb", "togglestarboards"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_TOGGLE_STARBOARD_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const toggle = !msg.guild.settings.toggles.starboard;
        await msg.guild.settings.update("toggles.starboard", toggle);
        return msg.sendMessage(`${toggle ? this.client.emotes.check : this.client.emotes.cross} ***${toggle ? msg.language.get("MESSAGE_STAR_ENABLED") : msg.language.get("MESSAGE_STAR_DISABLED")}`);
    }

};
