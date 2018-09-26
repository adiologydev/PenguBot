const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["tlm", "toggleleavemessages"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_TOGGLE_LEAVE_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (!msg.guild.settings.messages.leave.enabled) {
            if (!msg.guild.channels.get(msg.guild.settings.messages.leave.channel)) { await msg.guild.settings.update("messages.leave.channel", msg.channel.id); }
            if (!msg.guild.settings.messages.leave.message) { await msg.guild.settings.update("messages.leave.message", "It's sad to see you leaving **{USERNAME}**!", { action: "add" }); }
            return msg.guild.settings.update("messages.leave.enabled", true).then(() => {
                msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_LEAVE_ENABLED")}***`);
            });
        } else {
            return msg.guild.settings.update("messages.leave.enabled", false).then(() => {
                msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_LEAVE_DISABLED")}***`);
            });
        }
    }

};
