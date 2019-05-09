const MusicCommand = require("../../lib/structures/MusicCommand");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireDJ: false,
            requireMusic: false,
            permissionLevel: 5,
            cooldown: 8,
            aliases: ["djonly", "enabledjonly", "disabledjonly"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_DJONLY_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const toggle = !msg.guild.settings.toggles.djmode;
        await msg.guild.settings.update("toggles.djmode", toggle);
        return msg.sendMessage(`${toggle ? this.client.emotes.check : this.client.emotes.cross} ***Pengu DJ only mode has been ${toggle ? "Enabled" : "Disabled"}***`);
    }

};
