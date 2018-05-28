const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["mca", "makeachievement", "achievementget"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: msg => msg.language.get("COMMAND_MCA_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<Achievement:str>"
        });
    }

    async run(msg, [Achievement]) {
        const image = await this.client.idiotic.achievement(msg.author.displayAvatarURL({ format: "png", size: 128 }), Achievement);
        return msg.channel.sendFile(image);
    }

};
