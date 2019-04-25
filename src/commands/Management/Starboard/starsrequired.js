const Command = require("../../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["setstars", "setminimumstars"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "<Stars:integer>",
            description: language => language.get("COMMAND_REQUIRED_STAR_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [Stars]) {
        if (Stars < 1) return msg.sendMessage(`***${this.client.emotes.cross} Required Stars for Starboard can't be less than 1***`);
        return msg.guild.settings.update("starboard.required", Stars).then(() => {
            msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_STARS_REQUIRED_SET")}***`);
        });
    }

};
