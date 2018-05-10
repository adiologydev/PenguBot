const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["setprefix"],
            permissionLevel: 0,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_PREFIX_DESCRIPTION"),
            quotedStringSupport: false,
            usage: "[prefix:string]",
            usageDelim: undefined,
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [prefix]) {
        if (!await msg.hasAtLeastPermissionLevel(6)) return msg.sendMessage(`👉 ***${msg.language.get("MESSAGE_CURRENT_PREFIX")}*** ${msg.guild.configs.get("prefix")}`);
        if (!prefix) return msg.sendMessage(`👉 ***${msg.language.get("MESSAGE_CURRENT_PREFIX")}*** ${msg.guild.configs.get("prefix")}`);
        await msg.guild.configs.update({ prefix: prefix }).then(() => {
            msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_PREFIX_SET")}*** ${prefix}`);
        });
    }

};
