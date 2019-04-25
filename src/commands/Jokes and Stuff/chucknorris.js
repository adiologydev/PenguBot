const Command = require("../../lib/structures/KlasaCommand");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_CHUCK_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { body } = await get("http://api.chucknorris.io/jokes/random").catch(e => {
            Error.captureStackTrace(e);
            return e;
        });
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**Chuck Norris Joke**\n\n${body.value}`)
            .setThumbnail("https://i.imgur.com/3wIvF42.png");
        return msg.sendEmbed(embed);
    }

};
