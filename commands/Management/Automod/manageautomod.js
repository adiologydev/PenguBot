const Command = require("../../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["automod", "automodfilters", "toggleautomod"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_LVLROLE_DESCRPTION"),
            usage: "<toggle> [filter:string]",
            usageDelim: " "
        });
    }

    async run(msg, [toggle, filter]) {
        if (!filter) {
            if (msg.guild.settings.get("automod.enabled") === false) {
                return msg.guild.settings.update("automod.enabled", true).then(() => {
                    msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_AUTOMOD_ENABLED")}***`);
                });
            } else {
                return msg.guild.settings.update("automod.enabled", false).then(() => {
                    msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_AUTOMOD_DISABLED")}***`);
                });
            }
        }
    }

};
