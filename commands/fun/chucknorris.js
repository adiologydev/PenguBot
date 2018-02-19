const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");

module.exports = class ChuckNorrisCMD extends Command {

    constructor(client) {
        super(client, {
            name: "chucknorris",
            group: "fun",
            memberName: "chucknorris",
            description: "Tells a Chuck Norris Joke.",
            throttling: {
                usages: 1,
                duration: 10
            },
            usage: ["<prefix>chucknorris"]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { body } = await get("http://api.chucknorris.io/jokes/random");
        return msg.say(`📢 **Chuck Norris Joke:** *${body.value}*`);
    }

};
