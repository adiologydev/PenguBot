const { Command, MessageEmbed } = require("../../index");
const subReddits = ["AdviceAnimals", "MemeEconomy", "ComedyCemetery", "memes", "dankmemes", "PrequelMemes", "terriblefacebookmemes", "PewdiepieSubmissions", "funny"];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 5,
            aliases: ["memes", "randommeme"],
            requiredPermissions: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_MEME_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const subReddit = subReddits[Math.floor(Math.random() * subReddits.length)];
        let img = await this.client.funcs.scrapeSubreddit(subReddit);
        if (img && img.includes(".mp4")) img = await this.client.funcs.scrapeSubreddit(subReddit);
        if (!img || img.includes(".mp4")) return msg.sendMessage(`Too fast, too furious, try again!`);
        return msg.sendEmbed(new MessageEmbed().setImage(img).setFooter(`/r/${subReddit} - PenguBot.com`));
    }

};
