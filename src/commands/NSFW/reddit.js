const { Command } = require("../../index");
const subReddits = require("../../lib/constants/nsfw/subreddits.json");

const types = /top|hot|controversial|new|rising/i;

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
        let wcType;
        if (msg.flagArgs && msg.flagArgs.type) {
            const { type } = msg.flagArgs;
            if (types.test(type)) wcType = type;
        }

        if (!subreddit && msg.command.aliases.includes(msg.commandText)) {
            const aliasSubCat = subReddits[msg.commandText];
            const aliasSub = aliasSubCat[Math.floor(Math.random() * aliasSubCat.length)];
            const data = await this.client.funcs.scrapeSubreddit(aliasSub, { type: wcType });

            if (data.over_18 && !msg.channel.nsfw) return msg.sendMessage(`${this.client.emotes.cross} ***This channel is not NSFW so I can't send it here...***`);
            await msg.channel.send(data.url);
            return msg.channel.send(`**Note:** This command has been deprecated and will be renamed soon, please use \`${msg.guild.settings.get("prefix")}reddit <subreddit>\``);
        } else if (subreddit) {
            const data = await this.client.funcs.scrapeSubreddit(subreddit, { type: wcType });

            if (data.over_18 && !msg.channel.nsfw) return msg.sendMessage(`${this.client.emotes.cross} ***This channel is not NSFW so I can't send it here...***`);
            return msg.sendMessage([
                `> **Title:** ${data.title}`,
                `> **Author:** u/${data.author}`,
                `${data.url}`].join("\n"));
        } else {
            return msg.reply("Please specify a sub-reddit you would like to see.");
        }
    }

};
