const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 8,
            aliases: ["djonly", "enabledjonly", "disabledjonly"],
            permissionLevel: 0,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: msg => msg.language.get("COMMAND_DJONLY_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
        this.music = true;
    }

    async run(msg) {
        if (!msg.hasAtLeastPermissionLevel(3)) return msg.reply("<:penguError:435712890884849664> You are not a **Pengu DJ** to change the volume.");
        if (msg.guild.configs.djOnly) {
            await msg.guild.configs.update("djOnly", false);
            return msg.sendMessage(`<:penguError:435712890884849664> ***Pengu DJ only Mode has been Disabled.***`);
        } else {
            await msg.guild.configs.update("djOnly", true);
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***Pengu DJ only Mode has been Enabled.***`);
        }
    }

};
