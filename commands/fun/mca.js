const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class McaCommand extends Command {

    constructor(client) {
        super(client, {
            name: "mca",
            aliases: ["achievement"],
            group: "fun",
            memberName: "mca",
            description: "Send a Minecraft Achievement image to the channel",
            examples: ["achievement Title|Text (/achievement Achievement Get|Used a Command!)"],
            guildOnly: false,
            throttling: {
                usages: 2,
                duration: 3
            },
            args: [{
                key: "mcaa",
                prompt: "What would you like the achievement to be?\n",
                type: "string"
            }]
        });
    }

    async run(msg, { mcaa }) {
        if (msg.guild && !(msg.channel.permissionsFor(msg.guild.me).has("VIEW_CHANNEL") && msg.channel.permissionsFor(msg.guild.me).has("SEND_MESSAGES"))) return;
        try {
            let [title, contents] = mcaa.split("|");
            if (!contents) {
                [title, contents] = ["Achievement Get!", title];
            }
            let rnd = Math.floor((Math.random() * 39) + 1);
            if (mcaa.includes("burn")) rnd = 38;
            if (mcaa.includes("cookie")) rnd = 21;
            if (mcaa.includes("cake")) rnd = 10;

            if (title.length > 22 || contents.length > 22) return msg.channel.send("Max Length: 22 Characters. Soz.");
            const embed = new RichEmbed()
                .setColor("#2391e7")
                .setImage(`https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`);
            return msg.embed(embed);
        } catch (e) {
            return msg.reply(":x: There was an error, please try again and if the problem continuous then please do `p!invite` and join the support server.");
        }
    }

};
