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
        if (!await msg.hasAtLeastPermissionLevel(3)) return msg.reply(`${this.client.emotes.cross} You are not a **Pengu DJ** to change the volume.`);
        if (msg.guild.settings.toggles.djmode) {
            await msg.guild.settings.update("toggles.djmode", false);
            return msg.sendMessage(`${this.client.emotes.cross} ***Pengu DJ only Mode has been Disabled.***`);
        } else {
            await msg.guild.settings.update("toggles.djmode", true);
            return msg.sendMessage(`${this.client.emotes.check} ***Pengu DJ only Mode has been Enabled.***`);
        }
    }

};
