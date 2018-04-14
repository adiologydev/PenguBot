const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            bucket: 1,
            aliases: ["addautorole", "removeautorole", "removeautoroles", "deleteautorole", "deleteautoroles"],
            permLevel: 6,
            botPerms: ["SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["auto-roles"],
            usage: "<role:role>",
            description: (msg) => msg.language.get("COMMAND_ADD_ROLES_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [role]) {
        if (msg.guild.configs.get("auto-roles").indexOf(role.id) !== -1) {
            return msg.guild.configs.update("auto-roles", role).then(() => {
                msg.channel.send(`<:penguCross:432966551746904071> ***${role.name} ${msg.language.get("MESSAGE_AUTOROLE_REMOVED")}***`);
            });
        } else {
            return msg.guild.configs.update("auto-roles", role).then(() => {
                msg.channel.send(`<:penguCheck1:431440099675209738> ***${role.name} ${msg.language.get("MESSAGE_AUTOROLE_ADDED")}***`);
            });
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("auto-roles")) {
            this.client.gateways.guilds.schema.add("auto-roles", { type: "role", array: true, configurable: false });
        }
    }

};
