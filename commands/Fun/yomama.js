const { Command } = require("klasa");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["yomum", "yomom", "yomumma"],
            botPerms: ["SEND_MESSAGES"],
            description: (msg) => msg.language.get("COMMAND_YOMAMA_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { text } = await get("http://api.yomomma.info/"); // eslint-disable-line
        return msg.channel.send(`📢 ${msg.language.get("COMMAND_YOMAMA", JSON.parse(text).joke)}`);
    }

};
