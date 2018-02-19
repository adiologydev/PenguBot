const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");
module.exports = class YoMommaCMD extends Command {

    constructor(client) {
        super(client, {
            name: "yomomma",
            group: "fun",
            memberName: "yomomma",
            description: "Tells a random YoMomma joke.",
            aliases: ["yomum", "yomom", "yomumma"],
            throttling: {
                usages: 1,
                duration: 3
            },
            usage: ["<prefix>yomomma"]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { text } = await get("http://api.yomomma.info/"); // eslint-disable-line
        return msg.say(`📢**Yomomma joke:** *${JSON.parse(text).joke}*`);
    }

};
