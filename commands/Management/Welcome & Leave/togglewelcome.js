const { Command } = require("klasa");

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
        if (!msg.guild.settings.messages.welcome.enabled) {
            if (!msg.guild.channels.get(msg.guild.settings.messages.welcome.channel)) { await msg.guild.settings.update("messages.welcome.channel", msg.channel.id); }
            if (!msg.guild.settings.messages.welcome.message) { await msg.guild.settings.update("messages.welcome.message", "Welcome {MENTION} to {GUILD_NAME}, we hope you enjoy your stay!", { action: "add" }); }
            return msg.guild.settings.update("messages.welcome.enabled", true).then(() => {
                msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_WLCM_ENABLED")}***`);
            });
        } else {
            return msg.guild.settings.update("messages.welcome.enabled", false).then(() => {
                msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_WLCM_DISABLED")}***`);
            });
        }
    }

};
