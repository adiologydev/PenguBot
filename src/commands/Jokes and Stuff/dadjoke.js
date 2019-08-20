const { Command, MessageEmbed } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["joke"],
            requiredPermissions: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_DADJOKE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { joke } = await this.fetchURL("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } });

        return msg.sendEmbed(new MessageEmbed()
            .setDescription(`**Dad Joke Alert**\n\n${joke.length < 1900 ? joke : `${joke.substring(0, 1900)}...`}`)
            .setThumbnail("https://i.imgur.com/IxosIBh.png")
            .setColor("RANDOM"));
    }

};
