const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["setloggingchannel", "setlogchannel"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "[Channel:channel]",
            description: language => language.get("COMMAND_LOGCHAN_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [Channel = msg.channel]) {
        return msg.guild.settings.update("loggingChannel", Channel.id).then(() => {
            msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_LOGCHAN_SET")}***`);
        });
    }

};
