const { Command } = require("klasa");
const { get } = require("snekfetch");
const { parse } = require("fast-html-parser");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["fuckmylife"],
            botPerms: ["SEND_MESSAGES"],
            description: (msg) => msg.language.get("COMMAND_FML_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const result = await loadSite("http://www.fmylife.com/random");
        const root = parse(result);
        msg.channel.send(msg.language.get("COMMAND_FML", root.querySelector(".block a").text));
    }

};

async function loadSite(link) {
    const { text } = await get(link);
    return text;
}
