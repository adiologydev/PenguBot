const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: msg => msg.language.get("COMMAND_BLAME_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<BlameWho:user>"
        });
    }

    async run(msg, [BlameWho = msg.author]) {
        const image = await this.client.idiotic.blame(BlameWho.username);
        return msg.channel.sendFile(image);
    }

};
