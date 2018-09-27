const Command = require("../../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["setloggingchannel", "setlogchannel"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "[Channel:channelname]",
            description: language => language.get("COMMAND_LOGCHAN_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [Channel = msg.channel]) {
        return msg.guild.settings.update("loggingChannel", Channel.id).then(() => {
            msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_LOGCHAN_SET")}***`);
        });
    }

};
