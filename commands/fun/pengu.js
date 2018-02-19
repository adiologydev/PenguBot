const { Command } = require("discord.js-commando");
const pengus = ["http://i.imgur.com/Urfp335.png",
    "http://i.imgur.com/gC8v9fp.jpg",
    "http://i.imgur.com/DZ6YtvT.jpg",
    "http://i.imgur.com/LdWARAL.jpg",
    "http://i.imgur.com/7uF0u9Q.jpg",
    "http://i.imgur.com/0vgVnpr.png",
    "http://i.imgur.com/1GKlyH2.png",
    "http://i.imgur.com/jlzSELQ.png"
];
module.exports = class PenguCMD extends Command {

    constructor(client) {
        super(client, {
            name: "pengu",
            group: "fun",
            aliases: ["penguin", "pengubot", "cutepengu", "ngu", "engu"],
            memberName: "pengu",
            description: "Send a cute picture of Pengu!",
            throttling: {
                usages: 1,
                duration: 3
            },
            usage: ["<prefix>pengu"]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        return msg.reply("Here's a random lil' Pengu for you!", { files: [{ attachment: pengus[Math.floor(Math.random() * pengus.length)] }] });
    }

};
