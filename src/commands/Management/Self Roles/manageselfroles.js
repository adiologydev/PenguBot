const { Command } = require("../../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            requiredPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "USE_EXTERNAL_EMOJIS", "MANAGE_ROLES"],
            aliases: ["addselfrole", "addselfroles", "removeselfrole", "removeselfroles"],
            cooldown: 5,
            permissionLevel: 6,
            description: language => language.get("COMMAND_SELFROLES_MANAGE"),
            extendedHelp: "No extended help available.",
            usage: "<role:rolename>"
        });
    }

    async run(msg, [role]) {
        const roles = msg.guild.settings.roles.selfrole;
        if (!roles) return msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("CMD_NO_SELFROLES")}***`);
        if (!roles.includes(role.id)) {
            await msg.guild.settings.update("roles.selfrole", role, msg.guild);
            return msg.sendMessage(`${this.client.emotes.check} ***\`${role.name}\` ${msg.language.get("CMD_SELF_ASSIGNABLE")}***`);
        } else {
            await msg.guild.settings.update("roles.selfrole", role, msg.guild);
            return msg.sendMessage(`${this.client.emotes.cross} ***\`${role.name}\` ${msg.language.get("CMD_NO_ASSIGNABLE")}***`);
        }
    }

};
