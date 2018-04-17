const { Command } = require("klasa");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            cooldown: 10,
            aliases: ["shortener", "shortlink"],
            permLevel: 0,
            botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_SHORTEN_DESCRIPTION"),
            usage: "<link:url>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [link]) {
        const { body } = await get(`https://api-ssl.bitly.com/v3/shorten?access_token=${this.client.config.keys.bitly}&longUrl=${encodeURIComponent(link)}`);
        return msg.channel.send(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_LINK_SHORTEN")}*** ${body.data.url}`);
    }

};
