const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");

module.exports = class TrumpQuoteCMD extends Command {

    constructor(client) {
        super(client, {
            name: "trumpquote",
            group: "fun",
            aliases: ["trump", "trumpsays"],
            memberName: "trumpquote",
            description: Let's see, what Trump has to say about you!",
            throttling: {
                usages: 1,
                duration: 3
            },
            usage: ["<prefix>trumpquote"]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { body } = await get(`https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${msg.author.username}`).catch(() => msg.say(`There was an error, I think a cat has cut the wire off, dogs don't do that.`)); // eslint-disable-line
        return msg.reply(`🎺 **Trump Says:** ${body.message}`);
    }

};
