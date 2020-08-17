const { Command } = require("../../index");

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
        const data = await this.client.funcs.scrapeSubreddit(subReddit, { type: "top" });

        return msg.channel.send(data.url);
    }

};
