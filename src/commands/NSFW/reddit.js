const { Command } = require("../../index");

const subReddits = {
    amateur: ["Amateur", "RealGirls", "randomsexiness", "PetiteGoneWild", "homemadexxx", "AmateurArchives"],
    anal: ["anal", "buttsex", "AnalPorn", "upherbutt", "CumFromAnal"],
    asiannsfw: ["AsianHotties", "juicyasians", "AsianNSFW", "AsianPorn", "AsianHottiesGIFS"],
    bdsm: ["bdsm", "Spanking", "kinkyporn"],
    blowjob: ["Blowjobs", "OnHerKnees", "deepthroat", "BlowjobGifs", "OralSex", "dreamjobs", "lickingdick"],
    boobs: ["Boobies", "TittyDrop", "boobbounce", "boobs", "boobgifs", "tits", "BreastEnvy", "PerfectTits"],
    booty: ["booty", "SpreadEm", "twerking", "ButtsAndBareFeet", "booty_gifs"],
    ass: ["ass", "TheUnderbun", "HighResASS", "AssOnTheGlass", "datass", "assgifs"],
    cosplay: ["nsfwcosplay", "starwarsnsfw", "cosplayonoff", "Cosporn", "CosplayBoobs", "PornParody", "Cosplayheels"],
    fitgirls: ["fitgirls", "AthleticGirls", "Ohlympics", "NSFW_Hardbodies", "LockerRoom", "GymnastGirls", "worldcupgirls"],
    gifs: ["NSFW_GIF", "nsfw_gifs", "60fpsporn", "NSFW_HTML5", "porn_gifs", "adultgifs", "randomsexygifs", "PornGifs"],
    gonewild: ["gonewild", "gonewildcurvy", "asstastic", "AsiansGoneWild", "GWCouples", "GoneWildPlus", "GoneWildTube", "ladybonersgw"],
    hentai: ["hentai", "ecchi", "HENTAI_GIF", "doujinshi", "WesternHentai", "pantsu", "hentaivids", "hentaibondage", "MonsterGirl", "Lolicons"],
    lesbian: ["lesbians", "StraightGirlsPlaying", "girlskissing", "mmgirls", "scissoring", "dyke", "GirlsCuddling", "amateurlesbians", "Lesbian_gifs"],
    milfs: ["milf", "MilfsAndHousewives", "maturemilf", "realmilf", "ChocolateMilf", "GroupOfNudeMILFS", "HotAsianMilfs", "MILFS", "realmoms"],
    nsfw: ["nsfw", "nsfwhardcore", "nsfw2", "HighResNSFW", "BonerMaterial", "porn", "iWantToFuckHer", "Sexy", "nude", "NSFWCute", "HotGirls"],
    nsfwsnapchat: ["NSFW_Snapchat", "snapcgatgw", "snapchatboobs", "SnapchatImages", "NudeSelfies", "CellShots", "selfshots", "selfpix", "xPosing"],
    pussy: ["pussy", "rearpussy", "vagaina", "PussyMound", "PerfectPussies", "TheRearPussy", "PussySlip"],
    teen: ["LegalTeens", "just18", "youngporn", "Barelylegal", "barelylegalteens"]
};

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
        if (!msg.channel.nsfw) return msg.sendMessage(`${this.client.emotes.error} ***This channel is not NSFW so I can't send it here...***`);

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
