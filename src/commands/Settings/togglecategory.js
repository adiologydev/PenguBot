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
            usage: "(category:string)",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [category]) {
        category = category.toLowerCase();
        if (!this.categories.includes(category)) throw "That is not a valid category.";

        await msg.guild.settings.update("disabledCommandsGroup", category, { guild: msg.guild });
        const exists = msg.guild.settings.get("disabledCommandsGroup").includes(category);
        return msg.sendMessage(`${exists ? this.client.emotes.cross : this.client.emotes.check} ***${category[0].toUpperCase() + category.slice(1)} commands category has been ${exists ? "Disabled" : "Enabled"} by ${msg.author.tag}!***`);
    }

    get categories() {
        return [...new Set(this.client.commands.map(u => u.category.toLowerCase()))];
    }

};
