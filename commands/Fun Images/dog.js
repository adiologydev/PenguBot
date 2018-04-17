const { Command } = require("klasa");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["doggos", "dogpic"],
            botPerms: ["ATTACH_FILES", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_DOG_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { body } = await get("http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false");
        const embed = new this.client.methods.Embed()
            .setFooter("© PenguBot.cc")
            .setColor("RANDOM")
            .setDescription(`**Dog Picture**`)
            .setImage(body[0]);
        return msg.sendEmbed(embed);
    }

};
