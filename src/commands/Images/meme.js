const { Command } = require("../../index");
const subReddits = ["AdviceAnimals", "MemeEconomy", "ComedyCemetery", "memes", "dankmemes", "PrequelMemes", "terriblefacebookmemes", "PewdiepieSubmissions", "funny", "wholesomememes", "fffffffuuuuuuuuuuuu", "BikiniBottomTwitter", "2meirl4meirl", "DeepFriedMemes", "surrealmemes", "firstworldanarchists"];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 5,
            aliases: ["memes", "randommeme"],
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_MEME_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const subReddit = subReddits[Math.floor(Math.random() * subReddits.length)];
        const data = await this.client.funcs.scrapeSubreddit(subReddit, { type: "hot" });

        if (data.over_18 && !msg.channel.nsfw) return msg.sendMessage(`${this.client.emotes.cross} ***This channel is not NSFW so I can't send it here...***`);
        return msg.channel.send(data.url);
    }

};
