const { Command } = require("klasa");
const punches = [
    "http://i.imgur.com/aGPHQ3E.gif",
    "http://i.imgur.com/FxFfdOZ.gif",
    "http://i.imgur.com/XA7PPiy.gif",
    "http://i.imgur.com/5hcVtGf.gif",
    "http://i.imgur.com/nwGsg12.gif",
    "http://i.imgur.com/uCISIHo.gif",
    "http://i.imgur.com/GZX1COH.gif"
];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            botPerms: ["ATTACH_FILES", "SEND_MESSAGES"],
            description: (msg) => msg.language.get("COMMAND_PUNCH_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:user>"
        });
    }

    async run(msg, [user]) {
        return msg.channel.send(`👊 ${msg.language.get("COMMAND_PUNCH", msg.author, user)}`, {
            files: [
                {
                    attachment: punches[Math.floor(Math.random() * punches.length)],
                    name: "punch.gif"
                }
            ]
        });
    }

};
