const Command = require("../../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["twm", "togglewelcomemessages"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_TOGGLE_WELCOME_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (!msg.guild.settings.toggles.joinmsg) {
            if (!msg.guild.channels.get(msg.guild.settings.channels.join)) { await msg.guild.settings.update("channels.join", msg.channel.id); }
            if (!msg.guild.settings.messages.join) await msg.guild.settings.update("messages.join", "Welcome {MENTION} to {SERVER}, we hope you enjoy your stay!", { action: "add" });
            return msg.guild.settings.update("toggles.joinmsg", true).then(() => {
                msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_WLCM_ENABLED")}***`);
            });
        } else {
            return msg.guild.settings.update("toggles.joinmsg", false).then(() => {
                msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_WLCM_DISABLED")}***`);
            });
        }
    }

};
