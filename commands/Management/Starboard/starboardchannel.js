const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["ssc", "setstarboardchannel"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "[channel:channel]",
            usageDelim: "",
            description: language => language.get("COMMAND_CHANNEL_STAR_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [channel = msg.channel]) {
        return msg.guild.configs.update("starboard.channel", channel.id).then(() => {
            msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_STAR_CHANNEL_SET")}***`);
        });
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("starboard")) {
            await this.client.gateways.guilds.schema.add("starboard", {});
        }
        if (!this.client.gateways.guilds.schema.starboard.has("enabled")) {
            await this.client.gateways.guilds.schema.starboard.add("enabled", { type: "boolean", default: true });
        }
        if (!this.client.gateways.guilds.schema.starboard.has("channel")) {
            await this.client.gateways.guilds.schema.starboard.add("channel", { type: "channel" });
        }
    }

};
