const { Command } = require("../../index");
const subReddits = require("../../lib/constants/nsfw/subreddits.json");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 5,
            upvoteOnly: true,
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: "Get a random picture from a sub-reddit of your choice!",
            extendedHelp: "No extended help available.",
            usage: "[subreddit:string]",
            aliases: ["randomreddit", "redditimage", "subreddit", "amateur", "anal", "asiannsfw", "bdsm", "blowjob", "boobs", "booty", "ass", "cosplay", "fitgirls", "gifs", "nsfwgifs", "gonewild", "hentai", "lesbian", "milfs", "nsfw", "nsfwsnapchat", "pussy", "teen"]
        });
    }

    async run(msg, [subreddit]) {
        if (!msg.channel.nsfw) return msg.sendMessage(`${this.client.emotes.cross} ***This channel is not NSFW so I can't send it here...***`);

        if (!subreddit && msg.command.aliases.includes(msg.commandText)) {
            const aliasSubCat = subReddits[msg.commandText];
            const aliasSub = aliasSubCat[Math.floor(Math.random() * aliasSubCat.length)];
            const img = await this.client.funcs.scrapeSubreddit(aliasSub);
            if (!img) return msg.sendMessage("Too fast, too furious, please try again!");
            await msg.channel.send(`${img}`);
            return msg.channel.send(`**Note:** This command has been deprecated and will be renamed soon, please use \`${msg.guild.settings.get("prefix")}reddit <subreddit>\``);
        } else if (subreddit) {
            const img = await this.client.funcs.scrapeSubreddit(subreddit);
            if (!img) return msg.sendMessage("Too fast, too furious, please try again!");
            return msg.sendMessage(img);
        } else {
            return msg.reply("Please specify a sub-reddit you would like to see.");
        }
    }

};
