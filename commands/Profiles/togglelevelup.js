const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["togglelevelups", "levelups"],
            requiredConfigs: ["level-ups"],
            permLevel: 4,
            botPerms: ["SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "BAN_MEMBERS"],
            description: (msg) => msg.language.get("COMMAND_LEVELUP_DESCRIPTION"),
            quotedStringSupport: false,
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild.configs.get("level-ups") === true) {
            msg.guild.configs.update("level-ups", false);
            return msg.channel.send(`<:penguSuccess:435712876506775553> ***Level Up announcements have been Disabled!***`);
        } else {
            msg.guild.configs.update("level-ups", true);
            return msg.channel.send(`<:penguSuccess:435712876506775553> ***Level Up announcements have been Enabled!***`);
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("level-ups")) {
            this.client.gateways.guilds.schema.add("level-ups", { type: "boolean", default: true });
        }
    }

};
