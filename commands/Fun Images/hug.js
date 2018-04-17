const { Command } = require("klasa");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["sendhug"],
            botPerms: ["SEND_MESSAGES", "ATTACH_IMAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_HUG_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:user>"
        });
    }

    async run(msg, [user]) {
        const { body } = await get("https://nekos.life/api/v2/img/hug");
        const embed = new this.client.methods.Embed()
            .setFooter("© PenguBot.cc")
            .setImage(body.url)
            .setColor("RANDOM");
        return msg.channel.send(`🤗 | ***${user}, you just got hugged by ${msg.member.user}!***`, { embed: embed });
    }

};
