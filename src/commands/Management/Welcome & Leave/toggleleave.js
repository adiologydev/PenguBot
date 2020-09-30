const { Command } = require("../../../index");

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
        if (!msg.guild.settings.get("toggles.leavemsg")) {
            if (!msg.guild.channels.cache.get(msg.guild.settings.get("channels.leave"))) { await msg.guild.settings.update("channels.leave", msg.channel.id); }
            if (!msg.guild.settings.get("messages.leave")) await msg.guild.settings.update("messages.leave", "It's sad to see you leaving **{USERNAME}**!", { action: "add" });
            return msg.guild.settings.update("toggles.leavemsg", true).then(() => {
                msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_LEAVE_ENABLED")}***`);
            });
        } else {
            return msg.guild.settings.update("toggles.leavemsg", false).then(() => {
                msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_LEAVE_DISABLED")}***`);
            });
        }
    }

};
