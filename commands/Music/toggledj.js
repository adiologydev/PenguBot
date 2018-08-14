const MusicCommand = require("../../lib/structures/MusicCommand");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireDJ: true,
            requireMusic: true,
            cooldown: 8,
            aliases: ["djonly", "enabledjonly", "disabledjonly"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_DJONLY_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (!msg.hasAtLeastPermissionLevel(3)) return msg.reply("<:penguError:435712890884849664> You are not a **Pengu DJ** to change the volume.");
        if (msg.guild.settings.djOnly) {
            await msg.guild.settings.update("djOnly", false);
            return msg.sendMessage(`<:penguError:435712890884849664> ***Pengu DJ only Mode has been Disabled.***`);
        } else {
            await msg.guild.settings.update("djOnly", true);
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***Pengu DJ only Mode has been Enabled.***`);
        }
    }

};
