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
        if (!Option) return msg.reply(`${msg.language.get("CMD_LOG_INVALID")} \`automod\`, \`moderation\`, \`join\`, \`leave\`, \`channels\`, \`messages\`, \`roles\`.`);
        const opt = Option.toLowerCase();
        switch (opt) {
            case "automod": await this.update("automod", msg);
                break;
            case "moderation": await this.update("moderation", msg);
                break;
            case "channels": await this.update("channels", msg);
                break;
            case "join": await this.update("join", msg);
                break;
            case "leave": await this.update("leave", msg);
                break;
            case "messages": await this.update("messages", msg);
                break;
            case "roles": await this.update("roles", msg);
                break;
            default: msg.reply(`${msg.language.get("CMD_LOG_INVALID")} \`automod\`, \`moderation\`, \`join\`, \`leave\`, \`channels\`, \`messages\`, \`roles\`.`);
        }
    }

    async update(key, msg) {
        if (msg.guild.settings.get(`serverlogs.${key}`)) {
            const { errors } = await msg.guild.settings.update(`serverlogs.${key}`, false).catch(() => null);
            if (errors.length) return msg.sendMessage(`${this.client.emotes.cross} ***There was an error:*** \`${errors.first()}\``);
            return msg.sendMessage(`${this.client.emotes.cross} ***\`${key}\` ${msg.language.get("CMD_LOG_DISABLED")}***`);
        } else {
            const { errors } = await msg.guild.settings.update(`serverlogs.${key}`, true).catch(() => null);
            if (errors.length) return msg.sendMessage(`${this.client.emotes.cross} ***There was an error:*** \`${errors.first()}\``);
            return msg.sendMessage(`${this.client.emotes.check} ***\`${key}\` ${msg.language.get("CMD_LOG_ENABLED")}***`);
        }
    }

};
