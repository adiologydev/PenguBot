const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["toggleautorole", "enableautoroles", "disableautoroles"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["autoroles.enabled"],
            description: msg => msg.language.get("COMMAND_TOGGLE_ROLES_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild.configs.get("autoroles.enabled") === false) {
            return msg.guild.configs.update("autoroles.enabled", true).then(() => {
                msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_AUTOROLES_ENABLED")}***`);
            });
        } else {
            return msg.guild.configs.update("autoroles.enabled", false).then(() => {
                msg.sendMessage(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_AUTOROLES_DISABLED")}***`);
            });
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.autoroles.has("enabled")) {
            this.client.gateways.guilds.schema.autoroles.add("enabled", { type: "boolean", default: false });
        }
    }

};
