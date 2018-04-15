const { Command } = require("klasa");
const { get } = require("snekfetch");
const cheerio = require("cheerio");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["fact", "rfact"],
            botPerms: ["ATTACH_FILES", "SEND_MESSAGES"],
            description: (msg) => msg.language.get("COMMAND_RF_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { text } = await get("http://randomfactgenerator.net/")
            .catch(() => msg.channel.send(msg.language.get("COMMAND_RF_ERROR")));
        const $ = cheerio.load(text);
        msg.channel.send(msg.language.get("COMMAND_RF", $("div#z").first().text()));
    }

};
