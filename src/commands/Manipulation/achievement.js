const { Command } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["mca", "makeachievement", "achievementget"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_MCA_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<Achievement:str>"
        });
    }

    async run(msg, [Achievement]) {
        if (!Achievement.length > 20) throw "The given string is too long to use this command, please try something under 20 characters.";
        const image = await this.client.funcs.images("generate/achievement", { avatar: msg.author.displayAvatarURL({ format: "png", size: 128 }), text: Achievement })
            .catch(() => null);
        if (!image) return msg.reply(msg.language.get("ER_TRY_AGAIN"));
        return msg.channel.sendFile(image);
    }

};
