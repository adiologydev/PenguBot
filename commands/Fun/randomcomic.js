const { Command } = require("klasa");
const { get } = require("snekfetch");
const cheerio = require("cheerio");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["comic", "comics"],
            botPerms: ["ATTACH_FILES", "SEND_MESSAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_COMIC_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { text } = await get("http://explosm.net/rcg/").catch(() => msg.channel.send("There was an error, I think a cat has cut the wire off, dogs don't do that."));
        const $ = cheerio.load(text);

        const embed = new this.client.methods.Embed()
            .setColor("RANDOM")
            .setDescription(`**Random Comic**`)
            .setImage(`http:${$("#rcg-comic").first().find("img").first().attr("src").replace(/\\/g, "/")}`);
        return msg.sendEmbed(embed);
    }

};
