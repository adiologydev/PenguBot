const { Command } = require("klasa");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["sendpat"],
            botPerms: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_PAT_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:user>"
        });
    }

    async run(msg, [user]) {
        const { body } = await get("https://nekos.life/api/v2/img/pat");
        const embed = new this.client.methods.Embed()
            .setFooter("© PenguBot.cc")
            .setTimestamp()
            .setImage(body.url)
            .setColor("RANDOM");
        return msg.channel.send(`✋ | ***${user}, you just got patted by ${msg.member.user}!***`, { embed: embed });
    }

};
