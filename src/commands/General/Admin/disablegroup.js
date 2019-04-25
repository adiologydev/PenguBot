const Command = require("../../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            guarded: true,
            hidden: true,
            aliases: ["enablegroup", "disablecommandgroup", "enablecommandgroup", "disablecommandcategory", "enablecommandcategory"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_TOGGLE_GROUP_DESCRPTION"),
            usage: "<command:cmd>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [cmd]) {
        if (cmd.guarded) return msg.sendMessage(`${this.client.emotes.cross} ***${cmd.category} commands category can not be disabled!***`);
        if (msg.guild.settings.disabledCommandsGroup.indexOf(cmd.category) === -1) {
            await msg.guild.settings.update("disabledCommandsGroup", cmd.category, { action: "add" });
            return msg.sendMessage(`${this.client.emotes.check} ***${cmd.category} commands category has been Disabled by ${msg.author.tag}!***`);
        } else {
            await msg.guild.settings.update("disabledCommandsGroup", cmd.category, { action: "remove" });
            return msg.sendMessage(`${this.client.emotes.check} ***${cmd.category} commands category has been Enabled by ${msg.author.tag}!***`);
        }
    }

};
