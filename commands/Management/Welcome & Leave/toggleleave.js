const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            bucket: 1,
            aliases: ["tlm", "toggleleavemessages"],
            permLevel: 6,
            botPerms: ["USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["leave-messages"],
            description: (msg) => msg.language.get("COMMAND_TOGGLE_WELCOME_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild.configs.get("leave-messages") === false) {
            if (!msg.guild.channels.exists("id", msg.guild.configs.get("leave-channel"))) { msg.guild.configs.update("leave-channel", msg.channel.id); }
            if (msg.guild.configs.get("leave-text") === null) { msg.guild.configs.update("leave-text", "It's sad to see you leave {USERNAME}, hope to see you again.", { action: "add" }); }
            return msg.guild.configs.update("leave-messages", true).then(() => {
                msg.channel.send(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_LEAVE_ENABLED")}***`);
            });
        } else {
            return msg.guild.configs.update("leave-messages", false).then(() => {
                msg.channel.send(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_LEAVE_DISABLED")}***`);
            });
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("leave-messages")) {
            this.client.gateways.guilds.schema.add("leave-messages", { type: "boolean", default: false });
        }
        if (!this.client.gateways.guilds.schema.has("leave-channel")) {
            this.client.gateways.guilds.schema.add("leave-channel", { type: "channel" });
        }
        if (!this.client.gateways.guilds.schema.has("leave-text")) {
            this.client.gateways.guilds.schema.add("leave-text", { type: "string" });
        }
    }

};
