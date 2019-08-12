const { Command } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_APPROVED_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "[approvewho:username]"
        });
    }

    async run(msg, [approvewho = msg.author]) {
        const image = await this.client.funcs.images("overlay/approved", { avatar: approvewho.displayAvatarURL({ format: "png", size: 512 }) })
            .catch(() => null);
        if (!image) return msg.reply(msg.language.get("ER_TRY_AGAIN"));
        return msg.channel.sendFile(image);
    }

};
