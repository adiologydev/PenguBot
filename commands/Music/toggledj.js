const MusicCommand = require("../../lib/structures/MusicCommand");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireDJ: true,
            requireMusic: false,
            cooldown: 8,
            aliases: ["djonly", "enabledjonly", "disabledjonly"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_DJONLY_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (!msg.hasAtLeastPermissionLevel(3)) return msg.reply(`${this.client.emotes.cross} You are not a **Pengu DJ** to change the volume.`);
        if (msg.guild.settings.djOnly) {
            await msg.guild.settings.update("djOnly", false);
            return msg.sendMessage(`${this.client.emotes.cross} ***Pengu DJ only Mode has been Disabled.***`);
        } else {
            await msg.guild.settings.update("djOnly", true);
            return msg.sendMessage(`${this.client.emotes.check} ***Pengu DJ only Mode has been Enabled.***`);
        }
    }

};
