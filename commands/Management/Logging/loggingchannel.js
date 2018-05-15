const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["setloggingchannel", "setlogchannel"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "[Channel:channel]",
            description: (msg) => msg.language.get("COMMAND_LOGCHAN_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [Channel = msg.channel]) {
        return msg.guild.configs.update("loggingChannel", Channel.id).then(() => {
            msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_LOGCHAN_SET")}***`);
        });
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("loggingChannel")) {
            this.client.gateways.guilds.schema.add("loggingChannel", { type: "channel" });
        }
        if (!this.client.gateways.guilds.schema.has("logs")) {
            this.client.gateways.guilds.schema.add("logs", {});
        }
    }

};
