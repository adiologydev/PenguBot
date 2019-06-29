const { Command } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_TINDER_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<matchwith:username>"
        });
    }

    async run(msg, [matchwith]) {
        if (matchwith.id === msg.author.id) return msg.reply(msg.language.get("ER_TINDER"));
        const image = await this.client.funcs.images("generate/tinder", { avatar1: msg.author.displayAvatarURL({ format: "png", size: 256 }), avatar2: matchwith.displayAvatarURL({ format: "png", size: 256 }) })
            .catch(() => null);
        if (!image) return msg.reply(msg.language.get("ER_TRY_AGAIN"));
        return msg.channel.sendFile(image);
    }

};
