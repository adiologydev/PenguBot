const Command = require("../../lib/structures/KlasaCommand");
const subReddits = ["legalteens", "collegesluts", "adorableporn", "gonewild18", "18_19", "just18"];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            upvoteOnly: true,
            aliases: ["teens"],
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_TEEN_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (!msg.channel.nsfw) return msg.sendMessage(`<:penguError:435712890884849664> ***This channel is not NSFW so I can't send it here...***`);

        try {
            const img = await this.client.funcs.scrapeSubreddit(subReddits[Math.floor(Math.random() * subReddits.length)]);
            if (!img) return msg.sendMessage(`Too fast, too furious, try again!`);
            return msg.sendMessage(img);
        } catch (e) {
            return msg.sendMessage(`There was an error, try again!`);
        }
    }

};
