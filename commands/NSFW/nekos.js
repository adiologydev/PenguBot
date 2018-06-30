const { Command } = require("klasa");
const { get } = require("snekfetch");
const options = ["nsfw_neko_gif", "bj", "lewd", "cum", "les", "nsfw_avatar", "anal", "pussy", "boobs"];
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["neko", "nsfwneko", "nsfwnekos"],
            requiredPermissions: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: msg => msg.language.get("COMMAND_NEKOS_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (!msg.channel.nsfw) return msg.sendMessage(`<:penguError:435712890884849664> ***This channel is not NSFW so I can't send it here...***`);
        if (!await this.client.functions.isUpvoter(msg.author.id)) return msg.sendMessage(`<:penguError:435712890884849664> ***You are not an up-voter of PenguBot, please visit <https://www.pengubot.com/upvote> to vote now and get access!***`);
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
