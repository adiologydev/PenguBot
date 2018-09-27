const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_TINDER_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<MatchWith:username>"
        });
    }

    async run(msg, [MatchWith]) {
        if (MatchWith.id === msg.author.id) return msg.reply(msg.language.get("ER_TINDER"));
        const image = await this.client.idiotic.tinderMatch(msg.author.displayAvatarURL({ format: "png", size: 256 }), MatchWith.displayAvatarURL({ format: "png", size: 256 }))
            .catch(() => null);
        if (!image) return msg.reply(msg.language.get("ER_TRY_AGAIN"));
        return msg.channel.sendFile(image);
    }

};
