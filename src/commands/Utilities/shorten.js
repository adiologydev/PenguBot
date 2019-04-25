const Command = require("../../lib/structures/KlasaCommand");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            cooldown: 10,
            aliases: ["shortener", "shortlink"],
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_SHORTEN_DESCRIPTION"),
            usage: "<link:url>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [link]) {
        const data = await get(`https://is.gd/create.php?format=json&url=${encodeURIComponent(link)}`).catch(e => {
            Error.captureStackTrace(e);
            throw msg.language.get("ER_TRY_AGAIN");
        });
        return msg.sendMessage(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_LINK_SHORTEN")}*** ${JSON.parse(data.text).shorturl}`);
    }

};
