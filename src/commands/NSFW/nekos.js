const Command = require("../../lib/structures/KlasaCommand");
const { get } = require("snekfetch");
const options = ["nsfw_neko_gif", "bj", "lewd", "cum", "les", "nsfw_avatar", "anal", "pussy", "boobs"];
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            upvoteOnly: true,
            aliases: ["neko", "nsfwneko", "nsfwnekos"],
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_NEKOS_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (!msg.channel.nsfw) return msg.sendMessage(`<:penguError:435712890884849664> ***This channel is not NSFW so I can't send it here...***`);

        const option = options[Math.floor(Math.random() * options.length)];
        const { body } = await get(`https://nekos.life/api/v2/img/${option}`).catch(e => {
            Error.captureStackTrace(e);
            return e;
        });
        const embed = new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setImage(body.url)
            .setColor("RANDOM");
        return msg.sendMessage({ embed: embed });
    }

};
