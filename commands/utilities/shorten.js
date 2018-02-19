const googl = require("goo.gl");
const { Command } = require("discord.js-commando");

module.exports = class ShortenCMD extends Command {

    constructor(client) {
        super(client, {
            name: "shorten",
            group: "utilities",
            aliases: ["short", "goo.gl", "shortner", "s"],
            memberName: "shorten",
            description: "Shorten's a long url with goo.gl.",
            usage: ["<prefix>shorten <url>"],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                key: "url",
                prompt: "Please enter a URL to be shortened.",
                type: "string"
            }]
        });

        googl.setKey(this.client.config.GOOGLE_KEY);
        googl.getKey();
    }


    async run(msg, { url }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const regx = /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&\\=]*)/;

        if (url.match(regx)) {
            await googl.shorten(url)
                .then((shortUrl) => msg.reply(`I made you a new short URL, here it is: ${shortUrl}`))
                .catch((err) => {
                    console.error(err.message);
                    return msg.say(`Error trying to shorten the url, try again later.`);
                });
        } else {
            return msg.reply("Provided URL is invalid, please try again.");
        }
    }

};
