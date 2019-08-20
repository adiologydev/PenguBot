const { Command, MessageEmbed } = require("../../index");

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
        const { value } = await this.fetchURL("http://api.chucknorris.io/jokes/random");

        return msg.sendEmbed(new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**Chuck Norris Joke**\n\n${value}`)
            .setThumbnail("https://i.imgur.com/3wIvF42.png"));
    }

};
