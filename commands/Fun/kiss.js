const { Command } = require("klasa");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_KISS_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:user>"
        });
    }

    async run(msg, [user]) {
        const reply = await get("https://nekos.life/api/v2/img/kiss");
        const parsed = JSON.parse(reply.text);
        return msg.channel.send(msg.language.get("COMMAND_KISS", user, msg.author), { embed: { image: { url: parsed.url } } });
    }

};
