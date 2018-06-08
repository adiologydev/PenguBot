const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

const pics = ["http://i.imgur.com/Urfp335.png",
    "http://i.imgur.com/gC8v9fp.jpg", "http://i.imgur.com/DZ6YtvT.jpg", "http://i.imgur.com/LdWARAL.jpg",
    "http://i.imgur.com/7uF0u9Q.jpg", "http://i.imgur.com/0vgVnpr.png", "http://i.imgur.com/1GKlyH2.png",
    "http://i.imgur.com/jlzSELQ.png", "https://i.imgur.com/Vm98hJq.png", "https://i.imgur.com/RF4JeC8.png",
    "https://i.imgur.com/Co26qmr.png", "https://i.imgur.com/ixSGy7V.jpg", "https://i.imgur.com/WzsIIzN.png",
    "https://i.imgur.com/v8oxfHW.jpg", "https://i.imgur.com/RPxPRXV.png", "https://i.imgur.com/UVnwRMk.gif",
    "https://i.imgur.com/vfKwurE.gif", "https://i.imgur.com/XKukgBG.gif", "https://i.imgur.com/KohkQvr.gif",
    "https://i.imgur.com/uwdMmng.gif", "https://i.imgur.com/EOln62Q.gif", "https://i.imgur.com/8fcKsh1.gif"
];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["pingu", "penguin"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: msg => msg.language.get("COMMAND_PENGU_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const embed = new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setImage(pics[Math.floor(Math.random() * pics.length)])
            .setColor("RANDOM");
        return msg.sendMessage(`<:pengu:383632112323919872> | ***${msg.author}, here's the cute Pengu picture you requested!***`, { embed: embed });
    }

};
