const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["tlm", "toggleleavemessages"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["messages.leave.enabled"],
            description: msg => msg.language.get("COMMAND_TOGGLE_LEAVE_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (!msg.guild.configs.messages.leave.enabled) {
            if (!msg.guild.channels.get(msg.guild.configs.messages.leave.channel)) { await msg.guild.configs.update("messages.leave.channel", msg.channel.id); }
            if (!msg.guild.configs.messages.leave.message) { await msg.guild.configs.update("messages.leave.message", "It's sad to see you leaving **{USERNAME}**!", { action: "add" }); }
            return msg.guild.configs.update("messages.leave.enabled", true).then(() => {
                msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_LEAVE_ENABLED")}***`);
            });
        } else {
            return msg.guild.configs.update("messages.leave.enabled", false).then(() => {
                msg.sendMessage(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_LEAVE_DISABLED")}***`);
            });
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.messages.has("leave")) {
            await this.client.gateways.guilds.schema.messages.add("leave", {});
        }
        if (!this.client.gateways.guilds.schema.messages.leave.has("enabled")) {
            await this.client.gateways.guilds.schema.messages.leave.add("enabled", { type: "boolean", default: false });
        }
        if (!this.client.gateways.guilds.schema.messages.leave.has("channel")) {
            await this.client.gateways.guilds.schema.messages.leave.add("channel", { type: "channel" });
        }
        if (!this.client.gateways.guilds.schema.messages.leave.has("message")) {
            await this.client.gateways.guilds.schema.messages.leave.add("message", { type: "string" });
        }
    }

};
