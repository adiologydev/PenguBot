const Command = require("../../../lib/structures/KlasaCommand");
const logtypes = ["ban", "unban", "warn", "mute", "unmute", "kick", "softban"];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["modlog", "managemodlogs"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "<channel|toggle> [Channel:channelname|logtype:string]",
            usageDelim: " ",
            description: language => language.get("COMMAND_MODLOG_DESCRPTION"),
            extendedHelp: "No extended help available.",
            subcommands: true
        });
    }

    channel(msg, [Channel = msg.channel]) {
        return msg.guild.settings.update("loggingChannel", Channel.id).then(() => {
            msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_LOGCHAN_SET")}***`);
        });
    }

    async toggle(msg, [logtype]) {
        if (!logtype) return msg.reply(`${this.client.emotes.cross} ***You forgot to mention the type of modlog, please choose from the following:\n\`${logtypes.join("`, ")}\``);
        const type = logtype.toLowerCase();
        switch (type) {
            case "ban": await this.updateToggle(msg, "ban");
                break;
            case "unban": await this.updateToggle(msg, "unban");
                break;
            case "softban": await this.updateToggle(msg, "softban");
                break;
            case "kick": await this.updateToggle(msg, "kick");
                break;
            case "mute": await this.updateToggle(msg, "mute");
                break;
            case "unmute": await this.updateToggle(msg, "unmute");
                break;
            case "warn": await this.updateToggle(msg, "warn");
                break;
            default: return msg.reply(`${this.client.emotes.cross} ***You forgot to mention the type of modlog, please choose from the following:\n\`${logtypes.join("`, ")}\``);
        }
    }

    updateToggle(msg, type) {
        const toggle = !msg.guild.settings.modslogs.logsEnabled[type];
        return msg.guild.settings.update(`modlogs.logsEnabled.${type}`, toggle)
            .then(() => msg.reply(`${this.client.emotes.check} ***\`${type}\` mod logs have been ${toggle ? "Enabled" : "Disabled"}.***`))
            .catch(e => msg.reply(`${this.client.emotes.cross} ***There was an error: ${e}***`));
    }

};
