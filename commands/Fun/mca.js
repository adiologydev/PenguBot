const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_MCA_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<text:string>"
        });
    }

    async run(msg, [text]) {
        try {
            let [title, contents] = text.split("|");
            if (!contents) {
                [title, contents] = [msg.language.get("COMMAND_MCA_GET"), title];
            }
            let rnd = Math.floor((Math.random() * 39) + 1);
            if (text.includes("burn")) rnd = 38;
            if (text.includes("cookie")) rnd = 21;
            if (text.includes("cake")) rnd = 10;

            if (title.length > 22 || contents.length > 22) return msg.channel.send(msg.language.get("COMMAND_MCA_MAX_LENGTH_REACHED"));
            return msg.channel.send({ embed: { color: 0x2391e7, image: { url: `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}` } } });
        } catch (e) {
            return msg.reply(msg.language.get("COMMAND_MCA_ERROR"));
        }
    }

};
