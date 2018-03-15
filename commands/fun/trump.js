const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");

module.exports = class TrumpQuoteCMD extends Command {

    constructor(client) {
        super(client, {
            name: "trump",
            group: "fun",
            aliases: ["trumpquote", "trumpsays"],
            memberName: "trump",
            description: "Lets see, what Trump has to say about you!",
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: "user",
                prompt: "Who's do you want Trump to talk about?\n",
                type: "user",
                default: ""
            }],
            usage: ["<prefix>trump [user]"]
        });
    }

    async run(msg, { user }) {
        user = user || msg.author;
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { body } = await get(`https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${user.username}`).catch(() => msg.say(`There was an error, I think a cat has cut the wire off, dogs don't do that.`)); // eslint-disable-line
        return msg.channel.send(`🎺 **Trump Says:** ${body.message}`);
    }

};
