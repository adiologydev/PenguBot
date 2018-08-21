const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["swc", "setwelcomechan"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "[channel:channelname]",
            usageDelim: "",
            description: language => language.get("COMMAND_CHANNEL_WELCOME_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [channel = msg.channel]) {
        return msg.guild.settings.update("messages.welcome.channel", channel.id).then(() => {
            msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_WELCOME_CHANNEL_SET")}***`);
        });
    }

};
