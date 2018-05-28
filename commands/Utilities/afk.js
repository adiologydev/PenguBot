const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            cooldown: 5,
            permissionLevel: 0,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: msg => msg.language.get("COMMAND_AFK_DESCRIPTION"),
            usage: "[reason:string] [...]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [...reason]) {
        if (!reason.join(" ").length > 0) {
            reason = "No Reason";
        } else {
            reason = reason.join(" ");
        }

        const afk = await msg.author.configs.get("afk");
        if (!afk) {
            await msg.author.configs.update("afk", true).then(() => {
                msg.author.configs.update("afk-reason", reason, { action: "add" });
                msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_AFK_TRUE")}***`);
            });
        } else {
            await msg.author.configs.update("afk", false).then(() => {
                msg.author.configs.update("afk-reason", null);
                msg.sendMessage(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_AFK_FALSE")}***`);
            });
        }
    }

    async init() {
        if (!this.client.gateways.users.schema.has("afk")) {
            this.client.gateways.users.schema.add("afk", { type: "boolean", default: false, configurable: false });
        }
        if (!this.client.gateways.users.schema.has("afk-reason")) {
            this.client.gateways.users.schema.add("afk-reason", { type: "string", configurable: false });
        }
    }

};
