const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: [],
            botPerms: ["ATTACH_FILES", "SEND_MESSAGES", "VIEW_CHANNEL"],
            description: (msg) => msg.language.get("COMMAND_COOKIE_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:user>"
        });
    }

    async run(msg, [user]) {
        const cookieArray = [
            "https://cdn.discordapp.com/attachments/413190082116190209/434767492116643851/chocolate-chip-cookies.png",
            "https://cdn.discordapp.com/attachments/413190082116190209/434767516821356573/tumblr_static_tumblr_static__640.png",
            "https://cdn.discordapp.com/attachments/413190082116190209/434767549415030804/ba527c73569fd809f7374ab0b738c8ad.png",
            "https://cdn.discordapp.com/attachments/413190082116190209/434767589021843466/84905-Soft-Chocolate-Chip-Cookies.png",
            "https://cdn.discordapp.com/attachments/413190082116190209/434767621473173534/tumblr_olp1elO49T1u1yby1o1_500.png",
            "https://cdn.discordapp.com/attachments/413190082116190209/434767643061256203/cookies-chips-chocolate-chocolate-chip-cookies-Favim.png",
            "https://cdn.discordapp.com/attachments/413190082116190209/434767666415140874/2b17a81ac82df04f154686b450787260.png",
            "https://cdn.discordapp.com/attachments/413190082116190209/434767688825438218/121781-Basket-Of-Chocolate-Chip-Cookies.png",
            "https://cdn.discordapp.com/attachments/413190082116190209/434767731317800960/28709-Fudge-Dipped-Chocolate-Chip-Cookies.png",
            "https://cdn.discordapp.com/attachments/413190082116190209/434767762334679085/8e8e4bb4566a6a7151ab6492b0c7ca4b.png",
            "https://cdn.discordapp.com/attachments/413190082116190209/434767870736597012/best-chocolate-chip-chunk-cookies-recipe-best-salt-sea-salt.png",
            "https://cdn.discordapp.com/attachments/413190082116190209/434767893788491776/tumblr_inline_mll7xwokqC1qbau86.png",
            "https://cdn.discordapp.com/attachments/413190082116190209/434767986872549386/The-Best-Ever-Dark-Chocolate-Chunk-Cookies-37.png"
        ];
        msg.channel.send(`🍪 ${msg.language.get("COMMAND_COOKIE", msg.author, user)}`, {
            files: [
                {
                    attachment: cookieArray[Math.floor(Math.random() * cookieArray.length)],
                    name: "cookie.png"
                }
            ]
        });
    }

};
