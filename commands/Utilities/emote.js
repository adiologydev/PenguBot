const { Command } = require("klasa");
const { convert: { toCodePoint } } = require("twemoji");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            aliases: ["emoji"],
            bucket: 3,
            cooldown: 3,
            description: "Shows you an emote.",
            extendedHelp: "This command shows an image of an emote.",
            usage: "<emote:customemote>",
            requiredPermissions: ["ATTACH_FILES"]
        });

        this
            .createCustomResolver("customemote", (arg, possible) => {
                const id = /^(?:<a?:\w{2,32}:)?(\d{17,19})>?$/.exec(arg);
                if (id) {
                    const extension = /^(?:<a:\w{2,32}:)?(\d{17,19})>?$/.test(arg) ? "gif" : "png";
                    return `https://cdn.discordapp.com/emojis/${id[1]}.${extension}`;
                } else {
                    try {
                        const codepoint = toCodePoint(arg);
                        return `https://raw.githubusercontent.com/twitter/twemoji/gh-pages/2/72x72/${codepoint}.png`;
                    } catch (err) {
                        throw `${possible.name} must be a valid emoji.`;
                    }
                }
            });
    }

    async run(msg, [emote]) {
        return msg.channel.sendFile(emote);
    }

};
