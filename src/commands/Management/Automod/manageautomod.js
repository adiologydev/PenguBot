const { Command } = require("../../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["automod", "automodfilters", "toggleautomod"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            subcommands: true,
            description: language => language.get("COMMAND_AUTOMOD_DESCRPTION"),
            usage: "<toggle|threshold> [filter:string] [threshold:float]",
            usageDelim: " "
        });
    }

    async toggle(msg, [filter]) {
        if (!filter) {
            const mode = !msg.guild.settings.get("toggles.perspective");
            await msg.guild.settings.update("toggles.perspective", mode);
            return msg.sendMessage(`${mode ? this.client.emotes.check : this.client.emotes.cross} ***${mode ? msg.language.get("MESSAGE_AUTOMOD_ENABLED") : msg.language.get("MESSAGE_AUTOMOD_DISABLED")}***`);
        } else {
            filter = filter.toUpperCase();
            const { perspective } = msg.guild.settings.get("automod");
            const keys = Object.keys(perspective);

            if (!keys.includes(filter)) return msg.sendMessage(`${this.client.emotes.cross} ***That is an Invalid Filter, please choose from \`${keys.join("`, `")}\`.***`);

            const obj = perspective[filter];
            obj.enabled = !obj.enabled;

            const { errors } = await msg.guild.settings.update(`automod.perspective.${filter}`, obj, { action: "overwrite" });
            if (errors.length) return msg.sendMessage(`${this.client.emotes.cross} ***There was an error:*** ${errors[0]}`);
            return msg.sendMessage(`${obj.enabled ? this.client.emotes.check : this.client.emotes.cross} \`${filter}\` ***${msg.language.get("MESSAGE_AUTOMOD_TOGGLED")}.***`);
        }
    }

    async threshold(msg, [filter, threshold]) {
        if (!filter || !threshold) return msg.sendMessage(`${this.client.emotes.cross} ***Filter or Threshold are required arguments.***`);
        filter = filter.toUpperCase();

        const { perspective } = msg.guild.settings.get("automod");
        const keys = Object.keys(perspective);

        if (!keys.includes(filter)) return msg.sendMessage(`${this.client.emotes.cross} ***That is an Invalid Filter, please choose from \`${keys.join("`, `")}\`.***`);
        if (threshold && (threshold > 1 || threshold <= 0)) return msg.sendMessage(`${this.client.emotes.cross} ***Threshold can't be more than 1 or less than 0. i.e. 0.93***`);

        const obj = perspective[filter];
        obj.threshold = threshold;

        const { errors } = await msg.guild.settings.update(`automod.perspective.${filter}`, obj, { action: "overwrite" });
        if (errors.length) return msg.sendMessage(`${this.client.emotes.cross} ***There was an error:*** ${errors[0]}`);
        return msg.sendMessage(`${this.client.emotes.check} \`${filter}\` ***${msg.language.get("MESSAGE_AUTOMOD_TOGGLED")} with \`${threshold}\` threshold.***`);
    }

};
