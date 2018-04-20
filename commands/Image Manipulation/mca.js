const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["minecraftachievement"],
            botPerms: ["ATTACH_FILES", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_MCA_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<body:string> [...]"
        });
    }

    async run(msg, [...body]) {
        try {
            let [title, contents] = body.join(" ").split("|");
            if (!contents) {
                [title, contents] = ["Achievement Get!", title];
            }
            let rnd = Math.floor((Math.random() * 39) + 1);
            if (body.includes("burn")) rnd = 38;
            if (body.includes("cookie")) rnd = 21;
            if (body.includes("cake")) rnd = 10;

            if (title.length > 22 || contents.length > 22) return msg.channel.send("Max Length: 22 Characters. Sorry!");
            const embed = new this.client.methods.Embed()
                .setFooter("© PenguBot.cc")
                .setTimestamp()
                .setColor("#2391e7")
                .setImage(`https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`);
            return msg.channel.send({ embed: embed });
        } catch (e) {
            return msg.reply("<:penguError:435712890884849664> There was an error, please try again and if the problem presists then please join <https://PenguBot.cc/support>, the support server.");
        }
    }

};
