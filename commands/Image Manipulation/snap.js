const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["snapchat"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_SNAPCHAT_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<Snaptext:str>"
        });
    }

    async run(msg, [Snaptext]) {
        const image = await this.client.idiotic.snapchat(Snaptext)
            .catch(() => null);
        if (!image) return msg.reply(msg.language.get("ER_TRY_AGAIN"));
        return msg.channel.sendFile(image);
    }

};
