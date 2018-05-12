const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["slc", "setleavechan"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["leave-channel"],
            usage: "[channel:channel]",
            usageDelim: "",
            description: (msg) => msg.language.get("COMMAND_CHANNEL_LEAVE_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [channel = msg.channel]) {
        return msg.guild.configs.update("leave-channel", channel.id).then(() => {
            msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_LEAVE_CHANNEL_SET")}***`);
        });
    }

};
