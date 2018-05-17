const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["please"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_PLS_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<PlsWho:user>"
        });
    }

    async run(msg, [PlsWho = msg.author]) {
        const image = await this.client.idiotic.pls(PlsWho.username);
        return msg.channel.sendFile(image);
    }

};
