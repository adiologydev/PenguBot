const Command = require("../../lib/structures/KlasaCommand");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["sendcuddle"],
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_CUDDLE_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:username>"
        });
    }

    async run(msg, [user]) {
        const { body } = await get("https://nekos.life/api/v2/img/cuddle").catch(e => {
            Error.captureStackTrace(e);
            return e;
        });
        if (!body.url) throw msg.language.get("ERR_TRY_AGAIN");
        const embed = new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setImage(body.url)
            .setColor("RANDOM");
        return msg.sendMessage(`🤗 | ***${user}, ${msg.language.get("CMD_FUN_CUDDLE")} ${msg.author}!***`, { embed: embed });
    }

};
