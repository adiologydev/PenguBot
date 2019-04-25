const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["cmm"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_CMM_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<Text:str>"
        });
    }

    async run(msg, [Text]) {
        const image = await this.client.idiotic.changemymind(msg.author.displayAvatarURL({ format: "png", size: 128 }), Text)
            .catch(() => null);
        if (!image) return msg.reply(msg.language.get("ER_TRY_AGAIN"));
        return msg.channel.sendFile(image);
    }

};
