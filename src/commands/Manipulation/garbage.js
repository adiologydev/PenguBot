const { Command } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["garbagewho"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_GARBAGE_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "[garbagewho:username]"
        });
    }

    async run(msg, [garbagewho = msg.author]) {
        const image = await this.client.funcs.images("generate/garbage", { avatar: garbagewho.displayAvatarURL({ format: "png", size: 256 }) })
            .catch(() => null);
        if (!image) return msg.reply(msg.language.get("ER_TRY_AGAIN"));
        return msg.channel.sendFile(image);
    }

};
