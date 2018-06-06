const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["tccmd", "togglecustom", "tcmd", "togglecustomcommands"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: msg => msg.language.get("COMMAND_TOGGLE_CUSTOM_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild.configs.get("customcmds") === false) {
            return msg.guild.configs.update("customcmds.enabled", true).then(() => {
                msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_COMMAND_CUSTOM_ENABLED")}***`);
            });
        } else {
            return msg.guild.configs.update("customcmds.enabled", false).then(() => {
                msg.sendMessage(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_COMMAND_CUSTOM_DISABLED")}***`);
            });
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.customcmds.has("enabled")) {
            this.client.gateways.guilds.schema.customcmds.add("enabled", { type: "boolean", default: true });
        }
    }

};
