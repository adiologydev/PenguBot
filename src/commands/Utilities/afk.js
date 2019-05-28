const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 5,
            description: language => language.get("COMMAND_AFK_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "[reason:string]"
        });
    }

    async run(msg, [reason = "No reason"]) {
        const afk = await msg.author.settings.get("afk");

        if (afk.time) {
            await msg.author.settings.reset(["afk.time", "afk.reason"]);
            return msg.sendLocale("COMMAND_AFK_REMOVED", [msg.author.username]);
        }

        await msg.author.settings.update([["afk.time", Date.now()], ["afk.reason", reason]]);
        return msg.sendLocale("COMMAND_AFK_SET", [msg.author.username, reason]);
    }

};
