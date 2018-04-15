const { Command } = require("klasa");
const punches = ["http://i.imgur.com/aGPHQ3E.gif", "http://i.imgur.com/FxFfdOZ.gif", "http://i.imgur.com/XA7PPiy.gif",
    "http://i.imgur.com/5hcVtGf.gif", "http://i.imgur.com/nwGsg12.gif", "http://i.imgur.com/uCISIHo.gif",
    "http://i.imgur.com/GZX1COH.gif", "https://i.imgur.com/UcycckQ.gif", "https://i.imgur.com/VmdBxgq.gif",
    "https://i.imgur.com/IputsOi.gif", "https://i.imgur.com/UY3sTpj.gif", "https://i.imgur.com/VdwTwRo.gif",
    "https://i.imgur.com/VIKEo7q.gif", "https://i.imgur.com/XPq1P4F.gif", "https://i.imgur.com/X0uIstL.gif",
    "https://i.imgur.com/Of2BTLu.gif", "https://i.imgur.com/tSjlgKs.gif", "https://i.imgur.com/hEDcADi.gif"
];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["sendpunch"],
            botPerms: ["SEND_MESSAGES", "ATTACH_IMAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_PUNCH_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:user>"
        });
    }

    async run(msg, [user]) {
        const embed = new this.client.methods.Embed()
            .setImage(punches[Math.floor(Math.random() * punches.length)])
            .setColor("RANDOM");
        return msg.channel.send(`👊 | ***${user}, you just got punched by ${msg.member.user}!***`, { embed: embed });
    }

};
