const { Command, MessageEmbed } = require("../../index");
const options = ["nsfw_neko_gif", "bj", "lewd", "cum", "les", "nsfw_avatar", "anal", "pussy", "boobs"];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            upvoteOnly: true,
            aliases: ["neko", "nsfwneko", "nsfwnekos"],
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_NEKOS_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            nsfw: true
        });
    }

    async run(msg) {
        const option = options[Math.floor(Math.random() * options.length)];
        const body = await this.fetchURL(`https://nekos.life/api/v2/img/${option}`);

        return msg.sendEmbed(new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setImage(body.url)
            .setColor("RANDOM"));
    }

};
