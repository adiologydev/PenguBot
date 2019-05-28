const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["slapme"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_BATSLAP_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:username>"
        });
    }

    async run(msg, [user]) {
        const image = await this.client.funcs.images("generate/batslap", { slapper: msg.author.displayAvatarURL({ format: "png", size: 128 }), slapped: user.displayAvatarURL({ format: "png", size: 128 }) })
            .catch(() => null);
        if (!image) return msg.reply(msg.language.get("ER_TRY_AGAIN"));
        return msg.channel.sendFile(image);
    }

};
