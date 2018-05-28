const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["addautorole", "removeautorole", "removeautoroles", "deleteautorole", "deleteautoroles"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["autoroles.roles"],
            usage: "<role:role>",
            description: msg => msg.language.get("COMMAND_ADD_ROLES_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [role]) {
        if (msg.guild.configs.get("autoroles.roles").indexOf(role.id) !== -1) {
            return msg.guild.configs.update("autoroles.roles", role).then(() => {
                msg.sendMessage(`<:penguError:435712890884849664> ***${role.name} ${msg.language.get("MESSAGE_AUTOROLE_REMOVED")}***`);
            });
        } else {
            return msg.guild.configs.update("autoroles.roles", role).then(() => {
                msg.sendMessage(`<:penguSuccess:435712876506775553> ***${role.name} ${msg.language.get("MESSAGE_AUTOROLE_ADDED")}***`);
            });
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("autoroles")) {
            await this.client.gateways.guilds.schema.add("autoroles", {});
        }
        if (!this.client.gateways.guilds.schema.autoroles.has("roles")) {
            await this.client.gateways.guilds.schema.autoroles.add("roles", { type: "role", array: true, configurable: false });
        }
    }

};
