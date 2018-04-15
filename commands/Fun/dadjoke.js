const { Command } = require("klasa");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["dj", "jokefordad"],
            botPerms: ["SEND_MESSAGES", "VIEW_CHANNEL"],
            description: (msg) => msg.language.get("COMMAND_DADJOKE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { text } = await get("https://icanhazdadjoke.com/").set("Accept", "text/plain");
        return msg.channel.send(`📢 ${msg.language.get("COMMAND_DADJOKE", text)}`);
    }

};
