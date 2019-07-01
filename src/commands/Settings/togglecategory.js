const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            guarded: true,
            hidden: true,
            aliases: ["enablegroup", "disablecommandgroup", "enablecommandgroup", "disablecommandcategory", "enablecommandcategory", "disablecategory", "enablecategory", "disablegroup"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_TOGGLE_GROUP_DESCRPTION"),
            usage: "(category:cat)",
            extendedHelp: "No extended help available."
        });

        this.categories = [...new Set(this.client.commands.map(u => u.category.toLowerCase()))];
        this.createCustomResolver("cat", arg => {
            if (!this.categories.includes(arg.toLowerCase())) throw "That is not a valid category.";
            return arg;
        });
    }

    async run(msg, [category]) {
        await msg.guild.settings.update("disabledCommandsGroup", category);
        const exists = msg.guild.settings.get("disabledCommandsGroup").includes(category);
        return msg.sendMessage(`${exists ? this.client.emotes.cross : this.client.emotes.check} ***${category[0].toUpperCase() + category.slice(1)} commands category has been ${exists ? "Disabled" : "Enabled"} by ${msg.author.tag}!***`);
    }

};
