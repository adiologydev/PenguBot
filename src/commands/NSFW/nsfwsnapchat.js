const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            upvoteOnly: true,
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_SNAP_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (!msg.channel.nsfw) return msg.sendMessage(`<:penguError:435712890884849664> ***This channel is not NSFW so I can't send it here...***`);

        try {
            const img = await this.client.funcs.scrapeSubreddit("NSFWSnapchat");
            if (!img) return msg.sendMessage(`Too fast, too furious, try again!`);
            return msg.sendMessage(img);
        } catch (e) {
            return msg.sendMessage(`There was an error, try again!`);
        }
    }

};
