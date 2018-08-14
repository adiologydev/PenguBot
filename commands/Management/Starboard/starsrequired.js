const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["setstars", "setminimumstars"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "<Stars:integer>",
            description: language => language.get("COMMAND_REQUIRED_STAR_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [Stars]) {
        if (Stars < 1) return msg.sendMessage("***<:penguError:435712890884849664> Required Stars for Starboard can't be less than 1***");
        return msg.guild.settings.update("starboard.required", Stars).then(() => {
            msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_STARS_REQUIRED_SET")}***`);
        });
    }

    async init() {
        if (!this.client.gateways.guilds.schema.starboard.has("required")) {
            await this.client.gateways.guilds.schema.starboard.add("required", { type: "integer", default: 3 });
        }
    }

};
