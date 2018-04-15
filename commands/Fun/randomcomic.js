const { Command } = require("klasa");
const { get } = require("snekfetch");
const cheerio = require("cheerio");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["comic"],
            botPerms: ["SEND_MESSAGES", "ATTACH_FILES"],
            description: (msg) => msg.language.get("COMMAND_RC_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { text } = await get("http://explosm.net/rcg/")
            .catch(() => msg.channel.send(msg.language.get("COMMAND_RC_ERROR")));
        const $ = cheerio.load(text);
        return msg.channel.send(msg.language.get("COMMAND_RC"), {
            files: [
                {
                    attachment: `http:${$("#rcg-comic").first().find("img").first().attr("src").replace(/\\/g, "/")}`,
                    name: "random_comic.png"
                }
            ]
        });
    }

};
