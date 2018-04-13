const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            bucket: 1,
            aliases: ["twm", "togglewelcomemessages"],
            permLevel: 6,
            botPerms: ["SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["welcome-messages"],
            description: (msg) => msg.language.get("COMMAND_TOGGLE_WELCOME_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild.configs.get("welcome-messages") === false) {
            if (!msg.guild.channels.exists("id", msg.guild.configs.get("welcome-channel"))) { msg.guild.configs.update("welcome-channel", msg.channel.id); }
            if (msg.guild.configs.get("welcome-text") === null) { msg.guild.configs.update("welcome-text", "Welcome {MENTION} to {GUILD_NAME}, we hope you enjoy your stay!", { action: "add" }); }
            return msg.guild.configs.update("welcome-messages", true).then(() => {
                msg.channel.send(`<:penguCheck1:431440099675209738> ***${msg.language.get("MESSAGE_WLCM_ENABLED")}***`);
            });
        } else {
            return msg.guild.configs.update("welcome-messages", false).then(() => {
                msg.channel.send(`<:penguCross:432966551746904071> ***${msg.language.get("MESSAGE_WLCM_DISABLED")}***`);
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
