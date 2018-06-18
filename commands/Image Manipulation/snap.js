const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["snapchat"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: msg => msg.language.get("COMMAND_SNAPCHAT_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<Snaptext:str>"
        });
    }

    async run(msg, [Snaptext]) {
        const image = await this.client.idiotic.snapchat(Snaptext);
        return msg.channel.sendFile(image);
    }

};
