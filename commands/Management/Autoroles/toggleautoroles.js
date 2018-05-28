const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["toggleautorole", "enableautoroles", "disableautoroles"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["autoroles"],
            description: msg => msg.language.get("COMMAND_TOGGLE_ROLES_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild.configs.get("autoroles") === false) {
            return msg.guild.configs.update("autoroles", true).then(() => {
                msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_AUTOROLES_ENABLED")}***`);
            });
        } else {
            return msg.guild.configs.update("autoroles", false).then(() => {
                msg.sendMessage(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_AUTOROLES_DISABLED")}***`);
            });
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("autoroles")) {
            this.client.gateways.guilds.schema.add("autoroles", { type: "boolean", default: false });
        }
    }

};
