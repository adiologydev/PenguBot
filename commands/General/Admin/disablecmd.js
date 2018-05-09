const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            guarded: true,
            aliases: ["enablecmd", "disablecommand", "enablecommand", "togglecommand"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["disabledCommands"],
            description: (msg) => msg.language.get("COMMAND_TOGGLE_COMMAND_DESCRPTION"),
            usage: "<command:cmd>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [cmd]) {
        if (msg.guild.configs.disabledCommands.indexOf(cmd) === -1) {
            await msg.guild.configs.update("disabledCommands", cmd.name, { action: "add" });
            return msg.channel.send(`<:penguSuccess:435712876506775553> ***${cmd.name} command has been Disabled by ${msg.author.tag}!***`);
        } else {
            await msg.guild.configs.update("disabledCommands", cmd.name, { action: "remove" });
            return msg.channel.send(`<:penguSuccess:435712876506775553> ***${cmd.name} command has been Enabled by ${msg.author.tag}!***`);
        }
    }

};
