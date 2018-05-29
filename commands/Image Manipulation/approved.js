const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: msg => msg.language.get("COMMAND_APPROVED_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "[ApproveWho:user]"
        });
    }

    async run(msg, [ApproveWho = msg.author]) {
        const image = await this.client.idiotic.approved(ApproveWho.displayAvatarURL({ format: "png", size: 512 }));
        return msg.channel.sendFile(image);
    }

};
