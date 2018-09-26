const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["togglelevelups", "levelups"],
            permissionLevel: 4,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_LEVELUP_DESCRIPTION"),
            quotedStringSupport: false,
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild.settings.levelup) {
            await msg.guild.settings.update("levelup", false);
            return msg.sendMessage(`${this.client.emotes.check} ***Level Up announcements have been Disabled!***`);
        } else {
            await msg.guild.settings.update("levelup", true);
            return msg.sendMessage(`${this.client.emotes.check} ***Level Up announcements have been Enabled!***`);
        }
    }

};
