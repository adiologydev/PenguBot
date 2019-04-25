const Command = require("../../lib/structures/KlasaCommand");
const data = require("../../lib/constants/nsfw/gif");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["nsfwgif"],
            upvoteOnly: true,
            requiredPermissions: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_GIFS_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (!msg.channel.nsfw) return msg.sendMessage(`<:penguError:435712890884849664> ***This channel is not NSFW so I can't send it here...***`);
        return msg.sendMessage(data[Math.floor(Math.random() * data.length)]);
    }

};
