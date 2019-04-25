const Command = require("../../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["slm", "setleavemessage"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "<message:string>",
            description: language => language.get("COMMAND_SET_LEAVE_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [message]) {
        return msg.guild.settings.update("messages.leave.message", message).then(() => {
            msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_LEAVE_SET")}***`);
        });
    }

};
