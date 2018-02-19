const { Command } = require("discord.js-commando");

const cookies = ["http://i.imgur.com/SLwEY66.gif", "http://i.imgur.com/K6VoNp3.gif", "http://i.imgur.com/knVM6Lb.gif", "http://i.imgur.com/P1BMly5.gif", "http://i.imgur.com/I8CrTUT.gif"];

module.exports = class CookieCMD extends Command {

    constructor(client) {
        super(client, {
            name: "cookie",
            group: "fun",
            memberName: "cookie",
            description: "Give someone a cookie and make them feel special.",
            usage: ["<prefix>cookie <user>"],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [{
                key: "targetuser",
                prompt: "Who would you like to give a cookie to?\n",
                type: "user"
            }],
            guildOnly: true
        });
    }

    async run(msg, { targetuser }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        return msg.say(`🍪 **| ${msg.author} has given ${targetuser} a cookie.**`, { file: cookies[Math.floor(Math.random() * cookies.length)] })
            .catch(() => msg.say("I think the cookie as too delicious to be sent over the internet, try again!"));
    }

};
