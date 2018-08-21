const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["adblock", "antiinvites"],
            permissionLevel: 4,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_ADBLOCK_DESCRIPTION"),
            quotedStringSupport: false,
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild.settings.get("automod.invites") === true) {
            await msg.guild.settings.update("automod.invites", false);
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***Anti-invites have been Disabled!***`);
        } else {
            await msg.guild.settings.update("automod.invites", true);
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***Anti-invites have been Enabled!***`);
        }
    }

};
