const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["osustats"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_OSU_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<Username:str>"
        });
    }

    async run(msg, [Username]) {
        const image = await this.client.idiotic.osu(Username).catch(() => null);
        if (!image) return msg.reply(msg.language.get("CMD_OSU_ERR"));
        return msg.channel.sendFile(image);
    }

};
