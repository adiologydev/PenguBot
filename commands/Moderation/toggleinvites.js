const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["adblock", "antiinvites"],
            requiredConfigs: ["automod.invites"],
            permissionLevel: 4,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "BAN_MEMBERS"],
            description: msg => msg.language.get("COMMAND_ADBLOCK_DESCRIPTION"),
            quotedStringSupport: false,
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild.configs.get("automod.invites") === true) {
            msg.guild.configs.update("automod.invites", false);
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***Anti-invites have been Disabled!***`);
        } else {
            msg.guild.configs.update("automod.invites", true);
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***Anti-invites have been Enabled!***`);
        }
    }

};
