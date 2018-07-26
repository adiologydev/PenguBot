const { Command } = require("klasa");

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
        if (!image) return msg.reply("Either the user couldn't be found or we're having some issues.");
        return msg.channel.sendFile(image);
    }

};
