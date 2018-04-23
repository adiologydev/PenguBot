const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            cooldown: 5,
            aliases: ["letmegoogleitforyou", "google"],
            permLevel: 0,
            botPerms: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_LMGTFY_DESCRIPTION"),
            usage: "<query:string> [...]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [...query]) {
        return msg.channel.send(`<:blobsmilehappy:373821679132213248> | ***Here's your LMGTFY Link: <http://lmgtfy.com/?q=${query.join(" ").replace(/ /g, "+")}>***`);
    }

};
