const { Command } = require("../../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["swc", "setwelcomechan"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "[channel:channelname]",
            description: language => language.get("COMMAND_CHANNEL_WELCOME_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [channel = msg.channel]) {
        return msg.guild.settings.update("channels.join", channel.id).then(() => {
            msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_WELCOME_CHANNEL_SET")}***`);
        });
    }

};
