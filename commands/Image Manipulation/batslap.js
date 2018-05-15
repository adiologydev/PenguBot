const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["slapme"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_BATSLAP_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:user>"
        });
    }

    async run(msg, [user]) {
        const image = await this.client.idiotic.batSlap(msg.author.displayAvatarURL({ format: "png", size: 128 }),
            user.displayAvatarURL({ format: "png", size: 128 }));
        return msg.channel.sendFile(image);
    }

};
