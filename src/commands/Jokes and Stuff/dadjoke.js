const Command = require("../../lib/structures/KlasaCommand");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["joke"],
            requiredPermissions: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_DADJOKE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { text } = await get("https://icanhazdadjoke.com/").set("Accept", "text/plain").catch(e => {
            Error.captureStackTrace(e);
            return e;
        });
        const desc = text.length < 1900 ? text : `${text.substring(0, 1900)}...`;
        const embed = new MessageEmbed()
            .setDescription(`**Dad Joke Alert**\n\n${desc}`)
            .setThumbnail("https://i.imgur.com/IxosIBh.png")
            .setColor("RANDOM");
        return msg.sendMessage({ embed: embed });
    }

};
