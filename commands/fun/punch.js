const { Command } = require("discord.js-commando");
const punches = ["http://i.imgur.com/aGPHQ3E.gif",
    "http://i.imgur.com/FxFfdOZ.gif",
    "http://i.imgur.com/XA7PPiy.gif",
    "http://i.imgur.com/5hcVtGf.gif",
    "http://i.imgur.com/nwGsg12.gif",
    "http://i.imgur.com/uCISIHo.gif",
    "http://i.imgur.com/GZX1COH.gif"
];

module.exports = class PunchCMD extends Command {

    constructor(client) {
        super(client, {
            name: "punch",
            group: "fun",
            memberName: "punch",
            description: "Punch someone on the server.",
            usage: ["<prefix>punch <user>"],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: "targetuser",
                prompt: "Who would you like to give a punch to?\n",
                type: "user"
            }],
            guildOnly: true
        });
    }

    async run(msg, { targetuser }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        return msg.say(`👊 **| ${msg.author} hits ${targetuser} with a strong punch.**`, { file: punches[Math.floor(Math.random() * punches.length)] });
    }

};
