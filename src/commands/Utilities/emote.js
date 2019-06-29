const { Command, discordUtil: { parseEmoji }, util: { toCodePoint, fetch } } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            aliases: ["emoji", "jumbo"],
            cooldown: 3,
            description: "Shows you an emote.",
            extendedHelp: "This command shows an image of an emote.",
            usage: "<emote:customemote>",
            requiredPermissions: ["ATTACH_FILES"]
        });

        this
            .createCustomResolver("customemote", arg => {
                if (!arg) throw "No Emoji Provided, please provide one in order to use this command.";
                const discordEmoji = parseEmoji(arg);
                if (discordEmoji && discordEmoji.id) return `https://cdn.discordapp.com/emojis/${discordEmoji.id}.${discordEmoji.animated ? "gif" : "png"}`;

                const unicode = toCodePoint(arg);
                return `https://twemoji.maxcdn.com/2/72x72/${unicode}.png`;
            });
    }

    async run(msg, [emote]) {
        const emoji = await fetch(emote, { type: "buffer" }).catch(() => null);

        if (emoji === null) throw `The provided emoji is invalid. Please try a different one.`;

        return msg.channel.sendFile(emote);
    }

};
