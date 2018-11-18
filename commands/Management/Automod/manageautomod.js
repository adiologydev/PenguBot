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
            if (msg.guild.settings.get("automod.enabled") === false) {
                return msg.guild.settings.update("automod.enabled", true).then(() => {
                    msg.sendMessage(`${this.client.emotes.check} ***${msg.language.get("MESSAGE_AUTOMOD_ENABLED")}***`);
                });
            } else {
                return msg.guild.settings.update("automod.enabled", false).then(() => {
                    msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_AUTOMOD_DISABLED")}***`);
                });
            }
        } else {
            if (threshold && threshold >= 1 || threshold <= 0) return msg.sendMessage(`${this.client.emotes.cross} ***Threshold can't be more than 0 or less than 0. i.e. 0.93***`); // eslint-disable-line no-mixed-operators
            const { filters } = msg.guild.settings.automod;
            const keys = [];
            for (const k of Object.keys(filters)) {
                keys.push(k);
            }

            if (!keys.includes(filter.toUpperCase())) return msg.sendMessage(`${this.client.emotes.cross} ***That is an Invalid Filter, please choose from \`${keys.join("`, `")}\`.***`);

            const obj = filters[filter.toUpperCase()];
            const newObj = { enabled: !obj.enabled, threshold: threshold ? threshold : obj.threshold };

            return msg.guild.settings.update(`automod.filters.${filter.toUpperCase()}`, newObj, { action: "overwrite" }).then(() => {
                msg.sendMessage(`${!obj.enabled ? this.client.emotes.check : this.client.emotes.cross} \`${filter}\` ***${msg.language.get("MESSAGE_AUTOMOD_TOGGLED")} ${threshold ? `with \`${threshold}\` Threshold.` : "."}***`);
            });
        }
    }

};
