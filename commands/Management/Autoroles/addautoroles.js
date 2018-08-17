const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["addautorole", "removeautorole", "removeautoroles", "deleteautorole", "deleteautoroles"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "<role:rolename>",
            description: language => language.get("COMMAND_ADD_ROLES_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [role]) {
        if (msg.guild.settings.get("autoroles.roles").indexOf(role.id) !== -1) {
            return msg.guild.settings.update("autoroles.roles", role, msg.guild).then(() => {
                msg.sendMessage(`${this.client.emotes.cross} ***${role.name} ${msg.language.get("MESSAGE_AUTOROLE_REMOVED")}***`);
            });
        } else {
            return msg.guild.settings.update("autoroles.roles", role, msg.guild).then(() => {
                msg.sendMessage(`${this.client.emotes.cross} ***${role.name} ${msg.language.get("MESSAGE_AUTOROLE_ADDED")}***`);
            });
        }
    }

};
