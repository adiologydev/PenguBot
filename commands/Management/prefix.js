const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            bucket: 1,
            aliases: ["setprefix"],
            permLevel: 6,
            botPerms: ["SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_PREFIX_DESCRIPTION"),
            quotedStringSupport: false,
            usage: "<prefix:string>",
            usageDelim: undefined,
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [prefix]) {
        msg.guild.configs.update({ prefix: prefix });
        msg.channel.send(`✅ | ${msg.language.get("MESSAGE_PREFIX_SET")} **${prefix}**`);
    }

};
