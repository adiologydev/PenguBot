const { Command } = require("klasa");
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
        const { roles } = msg.guild.settings.selfroles;
        if (!roles) return msg.sendMessage(`${this.client.emotes.cross} ***This guild does not have any self assignable roles.***`);
        if (!roles.includes(role.id)) {
            await msg.guild.settings.update("selfroles.roles", role, msg.guild);
            return msg.sendMessage(`${this.client.emotes.check} ***\`${role.name}\` role is now self assignable.***`);
        } else {
            await msg.guild.settings.update("selfroles.roles", role, msg.guild);
            return msg.sendMessage(`${this.client.emotes.cross} ***\`${role.name}\` role is no longer self assignable.***`);
        }
    }

};
