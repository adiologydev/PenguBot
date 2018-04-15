const { Command } = require("klasa");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_HUG_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:user>"
        });
    }

    async run(msg, [user]) {
        const reply = await get("https://nekos.life/api/v2/img/hug");
        const parsed = JSON.parse(reply.text);
        msg.channel.send(msg.language.get("COMMAND_HUG", user, msg.author), { embed: { image: { url: parsed.url } } });
    }

};
