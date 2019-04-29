const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["modlog", "managemodlogs"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "<channel|toggle> [Channel:channelname]",
            usageDelim: " ",
            description: language => language.get("COMMAND_MODLOG_DESCRPTION"),
            extendedHelp: "No extended help available.",
            subcommands: true
        });
    }

    channel(msg, [Channel = msg.channel]) {
        return msg.guild.settings.update("loggingChannel", Channel.id)
            .then(() => msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_LOGCHAN_SET")}***`))
            .catch(e => msg.reply(`${this.client.emotes.cross} ***There was an error: ${e}***`));
    }

    async toggle(msg) {
        return msg.guild.settings.update("toggles.modlogs", !msg.guild.settings.toggles.modlogs)
            .then(() => msg.reply(`${this.client.emotes.check} ***Mod logs have been ${msg.guild.settings.toggles.modlogs ? "Enabled" : "Disabled"}.***`))
            .catch(e => msg.reply(`${this.client.emotes.cross} ***There was an error: ${e}***`));
    }

};
