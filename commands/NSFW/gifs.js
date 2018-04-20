const { Command } = require("klasa");
const randomPuppy = require("random-puppy");
const subReddits = ["gifsgonewild", "NSFW_GIF", "FaceofPain", "anal_gifs", "nsfw_gifs", "porn_hifs", "Hot_Women_Gifs", "GifsOfRemoval", "TittyDrop", "porninfifteenseconds", "CuteModeSlutMode", "60fpsporn", "NSFW_HML5"];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["nsfwgif"],
            botPerms: ["SEND_MESSAGES", "ATTACH_IMAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_GIFS_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (!msg.channel.nsfw) return msg.channel.send(`<:penguError:435712890884849664> ***This channel is not NSFW so I can't send it here...***`);
        if (!this.client.functions.isUpvoter(msg.author.id)) return msg.channel.send(`<:penguError:435712890884849664> ***You are not an up-voter of PenguBot, please visit <https://discordbots.org/bot/PenguBot/vote> to vote now and get access!***`);
        try {
            let img = await randomPuppy(subReddits[Math.floor(Math.random() * subReddits.length)]);
            if (!img) return msg.channel.send(`Too fast, too furious, try again!`);
            if (img.indexOf(".mp4")) {
                img = await randomPuppy(subReddits[Math.floor(Math.random() * subReddits.length)]);
            }
            const embed = new this.client.methods.Embed()
                .setFooter("© PenguBot.cc")
                .setTimestamp()
                .setImage(img)
                .setColor("RANDOM");
            return msg.channel.send({ embed: embed });
        } catch (e) {
            return msg.channel.send(`There was an error, try again!`);
        }
    }

};
