const { Command } = require("klasa");
const { get } = require("snekfetch");
const options = ["nsfw_neko_gif", "bj", "lewd", "cum", "les", "nsfw_avatar", "anal", "pussy", "boobs"];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["neko", "nsfwneko", "nsfwnekos"],
            botPerms: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_NEKOS_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (!msg.channel.nsfw) return msg.channel.send(`<:penguError:435712890884849664> ***This channel is not NSFW so I can't send it here...***`);
        if (!this.client.functions.isUpvoter(msg.author.id)) return msg.channel.send(`<:penguError:435712890884849664> ***You are not an up-voter of PenguBot, please visit <https://discordbots.org/bot/PenguBot/vote> to vote now and get access!***`);
        const option = options[Math.floor(Math.random() * options.length)];
        const { body } = await get(`https://nekos.life/api/v2/img/${option}`);
        const embed = new this.client.methods.Embed()
            .setFooter("© PenguBot.cc")
            .setTimestamp()
            .setImage(body.url)
            .setColor("RANDOM");
        return msg.channel.send({ embed: embed });
    }

};
