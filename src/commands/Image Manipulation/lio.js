const Command = require("../../lib/structures/KlasaCommand");
const fs = require("fs-nextra");
const { Canvas } = require("canvas-constructor");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["lionme"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_LIO_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "[user:username]"
        });
    }

    async run(msg, [user = msg.author]) {
        const lio = await fs.readFile(`../assets/manipulation/lio.png`);
        const avi = await get(user.displayAvatarURL({ format: "png", sze: 128 })).then(res => res.body)
            .catch(() => null);

        if (!avi) return msg.reply(msg.language.get("ER_TRY_AGAIN"));
        const img = await new Canvas(512, 512)
            .addImage(lio, 0, 0, 512, 512)
            .addImage(avi, 160, 25.5, 250, 250, { type: "round", radius: 120 })
            .toBufferAsync();
        return msg.channel.sendFile(img);
    }

};
