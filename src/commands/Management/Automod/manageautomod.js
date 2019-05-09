const Command = require("../../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["automod", "automodfilters", "toggleautomod"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_AUTOMOD_DESCRPTION"),
            usage: "<toggle> [filter:string] [threshold:float]",
            usageDelim: " "
        });
    }

    async run(msg, [toggle, filter, threshold]) {
        if (toggle && !filter) {
            const mode = !msg.guild.settings.toggles.perspective;
            await msg.guild.settings.update("toggles.perspective", mode);
            return msg.sendMessage(`${mode ? this.client.emotes.check : this.client.emotes.cross} ***${mode ? msg.language.get("MESSAGE_AUTOMOD_ENABLED") : msg.language.get("MESSAGE_AUTOMOD_DISABLED")}`);
        } else {
            filter = filter.toUpperCase();
            if (threshold && threshold >= 1 || threshold <= 0) return msg.sendMessage(`${this.client.emotes.cross} ***Threshold can't be more than 0 or less than 0. i.e. 0.93***`); // eslint-disable-line no-mixed-operators
            const { perspective } = msg.guild.settings.automod;
            const keys = Object.keys(perspective);

            if (!keys.includes(filter)) return msg.sendMessage(`${this.client.emotes.cross} ***That is an Invalid Filter, please choose from \`${keys.join("`, `")}\`.***`);

            const obj = perspective[filter];
            const newObj = { enabled: !obj.enabled, threshold: threshold ? threshold : obj.threshold };

            const { errors } = await msg.guild.settings.update(`automod.perspective.${filter}`, newObj, { action: "overwrite" });
            if (errors.length) return msg.sendMessage(`${this.client.emotes.cross} ***There was an error:*** ${errors[0]}`);
            return msg.sendMessage(`${!obj.enabled ? this.client.emotes.check : this.client.emotes.cross} \`${filter}\` ***${msg.language.get("MESSAGE_AUTOMOD_TOGGLED")} ${threshold ? `with \`${threshold}\` Threshold.` : "."}***`);
        }
    }

};
