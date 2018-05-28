const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["togglelevelups", "levelups"],
            requiredConfigs: ["levelup"],
            permissionLevel: 4,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "BAN_MEMBERS"],
            description: msg => msg.language.get("COMMAND_LEVELUP_DESCRIPTION"),
            quotedStringSupport: false,
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild.configs.levelup) {
            await msg.guild.configs.update("levelup", false);
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***Level Up announcements have been Disabled!***`);
        } else {
            await msg.guild.configs.update("levelup", true);
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***Level Up announcements have been Enabled!***`);
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("levelup")) {
            this.client.gateways.guilds.schema.add("levelup", { type: "boolean", default: true });
        }
    }

};
