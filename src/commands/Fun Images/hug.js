const Command = require("../../lib/structures/KlasaCommand");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["sendhug"],
            requiredPermissions: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_HUG_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:username>"
        });
    }

    async run(msg, [user]) {
        const { body } = await get("https://nekos.life/api/v2/img/hug").catch(e => {
            Error.captureStackTrace(e);
            return e;
        });
        if (!body.url) throw msg.language.get("ERR_TRY_AGAIN");
        const embed = new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setImage(body.url)
            .setColor("RANDOM");
        return msg.sendMessage(`🤗 | ***${user}, ${msg.language.get("CMD_FUN_HUG")} ${msg.author}!***`, { embed: embed });
    }

};
