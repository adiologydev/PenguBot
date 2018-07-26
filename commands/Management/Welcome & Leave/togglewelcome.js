const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["twm", "togglewelcomemessages"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_TOGGLE_WELCOME_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (!msg.guild.configs.messages.welcome.enabled) {
            if (!msg.guild.channels.get(msg.guild.configs.messages.welcome.channel)) { await msg.guild.configs.update("messages.welcome.channel", msg.channel.id); }
            if (!msg.guild.configs.messages.welcome.message) { await msg.guild.configs.update("messages.welcome.message", "Welcome {MENTION} to {GUILD_NAME}, we hope you enjoy your stay!", { action: "add" }); }
            return msg.guild.configs.update("messages.welcome.enabled", true).then(() => {
                msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_WLCM_ENABLED")}***`);
            });
        } else {
            return msg.guild.configs.update("messages.welcome.enabled", false).then(() => {
                msg.sendMessage(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_WLCM_DISABLED")}***`);
            });
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("messages")) {
            await this.client.gateways.guilds.schema.add("messages", {});
        }
        if (!this.client.gateways.guilds.schema.messages.has("welcome")) {
            await this.client.gateways.guilds.schema.messages.add("welcome", {});
        }
        if (!this.client.gateways.guilds.schema.messages.welcome.has("enabled")) {
            await this.client.gateways.guilds.schema.messages.welcome.add("enabled", { type: "boolean", default: false });
        }
        if (!this.client.gateways.guilds.schema.messages.welcome.has("channel")) {
            await this.client.gateways.guilds.schema.messages.welcome.add("channel", { type: "channel" });
        }
        if (!await this.client.gateways.guilds.schema.messages.welcome.has("message")) {
            await this.client.gateways.guilds.schema.messages.welcome.add("message", { type: "string", default: "Welcome {MENTION} to {GUILD_NAME}, we hope you enjoy your stay!" });
        }
    }

};
