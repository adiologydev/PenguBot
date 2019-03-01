const Command = require("../../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["enablelog", "disablelog", "togglelog"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_LOG_DESCRPTION"),
            usage: "[Option:string]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [Option]) {
        if (!Option) return msg.reply(`${msg.language.get("CMD_LOG_INVALID")} \`automod\`, \`ban\`, \`kick\`, \`join\`, \`leave\`, \`channels\`, \`mute\`, \`messages\`, \`roles\`.`);
        const opt = Option.toLowerCase();
        switch (opt) {
            case "automod": this.update("automod", msg);
                break;
            case "ban": this.update("ban", msg);
                break;
            case "kick": this.update("kick", msg);
                break;
            case "channels": this.update("channels", msg);
                break;
            case "join": this.update("join", msg);
                break;
            case "leave": this.update("leave", msg);
                break;
            case "mute": this.update("mute", msg);
                break;
            case "messages": this.update("messages", msg);
                break;
            case "roles": this.update("roles", msg);
                break;
            default: msg.reply(`${msg.language.get("CMD_LOG_INVALID")} \`automod\`, \`ban\`, \`kick\`, \`join\`, \`leave\`, \`channels\`, \`mute\`, \`messages\`, \`roles\`.`);
        }
    }

    update(key, msg) {
        if (msg.guild.settings.get(`logs.${key}`)) {
            msg.guild.settings.update(`logs.${key}`, false);
            return msg.sendMessage(`${this.client.emotes.cross} ***\`${key}\` ${msg.language.get("CMD_LOG_DISABLED")}***`);
        } else {
            msg.guild.settings.update(`logs.${key}`, true);
            return msg.sendMessage(`${this.client.emotes.check} ***\`${key}\` ${msg.language.get("CMD_LOG_ENABLED")}***`);
        }
    }

};
