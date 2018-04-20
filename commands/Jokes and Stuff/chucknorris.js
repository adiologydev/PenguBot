const { Command } = require("klasa");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            botPerms: ["ATTACH_FILES", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_CHUCK_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { body } = await get("http://api.chucknorris.io/jokes/random");
        const embed = new this.client.methods.Embed()
            .setColor("RANDOM")
            .setDescription(`**Chuck Norris Joke**\n\n${body.value}`)
            .setThumbnail("https://i.imgur.com/3wIvF42.png");
        return msg.sendEmbed(embed);
    }

};
