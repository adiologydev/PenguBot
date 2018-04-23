const { Command } = require("klasa");
const { get } = require("snekfetch");
const { parse } = require("fast-html-parser");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["fact", "rfact"],
            botPerms: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_FACT_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { text } = await get("http://randomfactgenerator.net/").catch(() => msg.channel.send("There was an error, I think a cat has cut the wire off, dogs don't do that."));
        const root = parse(text);
        const article = root.querySelector("#z");

        const embed = new this.client.methods.Embed()
            .setDescription(`**Random Fact**\n\n${article.childNodes[0].rawText}`)
            .setThumbnail("https://i.imgur.com/fJiD9Jo.png")
            .setColor("RANDOM");
        return msg.channel.send({ embed: embed });
    }

};
