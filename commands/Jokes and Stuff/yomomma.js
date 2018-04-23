const { Command } = require("klasa");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["yomoma", "yomommafat", "yomommasofat"],
            botPerms: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_MOMMA_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { text } = await get(`http://api.yomomma.info`).catch(() => msg.channel.send("There was an error, I think a cat has cut the wire off, dogs don't do that."));

        const embed = new this.client.methods.Embed()
            .setDescription(`**Yo Momma Joke**\n\n${JSON.parse(text).joke}`)
            .setThumbnail("https://i.imgur.com/ordRh9e.png")
            .setColor("RANDOM");
        return msg.channel.send({ embed: embed });
    }

};
