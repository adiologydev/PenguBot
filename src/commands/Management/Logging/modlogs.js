const Command = require("../../../lib/structures/KlasaCommand");

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

    async channel(msg, [Channel = msg.channel]) {
        const { errors } = await msg.guild.settings.update("channels.modlogs", Channel.id);
        if (errors) return msg.reply(`${this.client.emotes.cross} ***There was an error: ${errors[0]}***`);
        return msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_LOGCHAN_SET")}***`);
    }

    async toggle(msg) {
        const { errors } = await msg.guild.settings.update("toggles.modlogs", !msg.guild.settings.get("toggles.modlogs"));
        if (errors) return msg.reply(`${this.client.emotes.cross} ***There was an error: ${errors[0]}***`);
        return msg.reply(`${this.client.emotes.check} ***Mod logs have been ${msg.guild.settings.get("toggles.modlogs") ? "Enabled" : "Disabled"}.***`);
    }

};
