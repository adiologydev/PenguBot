const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["setprefix"],
            permissionLevel: 0,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_PREFIX_DESCRIPTION"),
            quotedStringSupport: false,
            usage: "[prefix:string]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [prefix]) {
        if (!await msg.hasAtLeastPermissionLevel(6)) return msg.sendMessage(`👉 ***${msg.language.get("MESSAGE_CURRENT_PREFIX")}*** ${msg.guild.settings.get("prefix")}`);
        if (!prefix) return msg.sendMessage(`👉 ***${msg.language.get("MESSAGE_CURRENT_PREFIX")}*** ${msg.guild.settings.get("prefix")}`);
        await msg.guild.settings.update({ prefix: prefix }).then(() => {
            msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_PREFIX_SET")}*** ${prefix}`);
        });
    }

};
