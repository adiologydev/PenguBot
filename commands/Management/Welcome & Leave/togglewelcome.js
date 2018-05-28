const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["twm", "togglewelcomemessages"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["welcome-messages"],
            description: msg => msg.language.get("COMMAND_TOGGLE_WELCOME_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild.configs.get("welcome-messages") === false) {
            if (!msg.guild.channels.exists("id", msg.guild.configs.get("welcome-channel"))) { msg.guild.configs.update("welcome-channel", msg.channel.id); }
            if (msg.guild.configs.get("welcome-text") === null) { msg.guild.configs.update("welcome-text", "Welcome {MENTION} to {GUILD_NAME}, we hope you enjoy your stay!", { action: "add" }); }
            return msg.guild.configs.update("welcome-messages", true).then(() => {
                msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_WLCM_ENABLED")}***`);
            });
        } else {
            return msg.guild.configs.update("welcome-messages", false).then(() => {
                msg.sendMessage(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_WLCM_DISABLED")}***`);
            });
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("welcome-messages")) {
            this.client.gateways.guilds.schema.add("welcome-messages", { type: "boolean", default: false });
        }
        if (!this.client.gateways.guilds.schema.has("welcome-channel")) {
            this.client.gateways.guilds.schema.add("welcome-channel", { type: "channel" });
        }
        if (!this.client.gateways.guilds.schema.has("welcome-text")) {
            this.client.gateways.guilds.schema.add("welcome-text", { type: "string" });
        }
    }

};
