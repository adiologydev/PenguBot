const { Command, MessageEmbed } = require("../../index");

const SUB_REDDITS = ["wholesome", "aww", "AnimalsBeingBros"];
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 10,
            bucket: 2,
            aliases: ["wholesome", "aww"],
            requiredPermissions: ["EMBED_LINKS"],
            description: language => language.get("COMMAND_WHOLESOME_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const subReddit = SUB_REDDITS[Math.floor(Math.random() * SUB_REDDITS.length)];
        let img = await this.client.funcs.scrapeSubreddit(subReddit);
        if (img && img.includes(".mp4")) img = await this.client.funcs.scrapeSubreddit(subReddit);
        if (!img || img.includes(".mp4")) return msg.sendMessage(`Too fast, too furious, try again!`);
        return msg.sendEmbed(new MessageEmbed()
            .setImage(img)
            .setFooter(`/r/${subReddit} - PenguBot.com`)
        );
    }

};
