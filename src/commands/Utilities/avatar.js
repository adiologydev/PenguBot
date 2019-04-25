const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            cooldown: 5,
            aliases: ["pp", "profilepicture"],
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_AVATAR_DESCRIPTION"),
            usage: "[person:username]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [person = msg.author]) {
        return msg.sendMessage(`<:blobsmilehappy:373821679132213248> | ***${msg.language.get("MESSAGE_AVATAR")} ${person.tag}:*** ${person.displayAvatarURL({ size: 2048 })}`);
    }

};
