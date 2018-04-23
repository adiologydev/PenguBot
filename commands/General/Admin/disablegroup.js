const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            guarded: true,
            aliases: ["enablegroup", "disablecommandgroup", "enablecommandgroup", "disablecommandcategory", "enablecommandcategory"],
            permLevel: 6,
            botPerms: ["USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["disabledCommands"],
            description: (msg) => msg.language.get("COMMAND_TOGGLE_GROUP_DESCRPTION"),
            usage: "<command:cmd>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [cmd]) {
        if (cmd.guarded) return msg.channel.send(`<:penguError:435712890884849664> ***${cmd.category} commands category can not be disabled!***`);
        if (msg.guild.configs.disabledCommandsGroup.indexOf(cmd.category) === -1) {
            await msg.guild.configs.update("disabledCommandsGroup", cmd.category, { action: "add" });
            return msg.channel.send(`<:penguSuccess:435712876506775553> ***${cmd.category} commands category has been Disabled by ${msg.author.tag}!***`);
        } else {
            await msg.guild.configs.update("disabledCommandsGroup", cmd.category, { action: "remove" });
            return msg.channel.send(`<:penguSuccess:435712876506775553> ***${cmd.category} commands category has been Enabled by ${msg.author.tag}!***`);
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("disabledCommandsGroup")) {
            this.client.gateways.guilds.schema.add("disabledCommandsGroup", { type: "string", array: true, configurable: false });
        }
    }

};
