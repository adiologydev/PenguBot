const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["missingposter"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_MISSING_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "[user:username]"
        });
    }

    async run(msg, [user = msg.author]) {
        const image = await this.client.idiotic.missing(user.displayAvatarURL({ format: "png", size: 512 }), user.username)
            .catch(() => null);
        if (!image) return msg.reply(msg.language.get("ER_TRY_AGAIN"));
        return msg.channel.sendFile(image);
    }

};
