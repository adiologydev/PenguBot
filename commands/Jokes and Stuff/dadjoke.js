const { Command } = require("klasa");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["joke"],
            botPerms: ["SEND_MESSAGES", "ATTACH_IMAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_DADJOKE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { text } = await get("https://icanhazdadjoke.com/").set("Accept", "text/plain");
        const embed = new this.client.methods.Embed()
            .setDescription(`**Dad Joke Alert**\n\n${text}`)
            .setThumbnail("https://i.imgur.com/IxosIBh.png")
            .setColor("RANDOM");
        return msg.channel.send({ embed: embed });
    }

};
