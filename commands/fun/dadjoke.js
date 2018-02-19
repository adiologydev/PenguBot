const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");

module.exports = class DadJokeCMD extends Command {

    constructor(client) {
        super(client, {
            name: "dadjoke",
            group: "fun",
            aliases: ["joke", "tellmeajoke"],
            memberName: "dadjoke",
            description: "Tells a Stupid Dad Joke.",
            throttling: {
                usages: 1,
                duration: 10
            },
            usage: ["<prefix>dadjoke"]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { text } = await get("https://icanhazdadjoke.com/").set("Accept", "text/plain");
        return msg.say(`📢 **Dad Joke Alert:** ${text}`);
    }

};
