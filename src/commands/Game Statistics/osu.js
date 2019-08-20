const { Command, config } = require("../../index");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["osustats"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_OSU_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<username:str>"
        });
    }

    async run(msg, [username]) {
        const image = await this.fetchURL("https://dev.anidiots.guide/generators/osu", { type: "buffer", query: { user: username, theme: "dark" }, headers: { Authorization: config.apis.idiotic } });
        if (!image) return msg.reply(msg.language.get("CMD_OSU_ERR"));
        return msg.channel.sendFile(image);
    }

};
