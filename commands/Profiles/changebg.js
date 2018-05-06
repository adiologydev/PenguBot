const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            permissionLevel: 0,
            aliases: ["changebackground", "changeprofilebg"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_CHANGEBG_DESCRIPTION"),
            usage: "[BackgroundID:integer]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [BackgroundID]) {
        if (!BackgroundID) return msg.reply("Please enter a **Background ID** in order to change a background, you can look up the background names and prices at: <https://github.com/AdityaTD/PenguBot/wiki/Profile-Backgrounds-and-Prices>");
        if (BackgroundID === 1) {
            if (!msg.author.configs.backgrounds.includes("default")) return msg.reply("You do not own this background, please buy it using `p!buybg ID` first.");
            if (msg.author.configs.get("profile-bg") === "default") return msg.reply("That is already your current background, please enter another one.");
            await msg.author.configs.update("profile-bg", "default");
            return msg.channel.send("<:penguSuccess:435712876506775553> ***Your Profile Background is now set to: `default`***");
        }
        if (BackgroundID === 2) {
            if (!msg.author.configs.backgrounds.includes("sunset-palms")) return msg.reply("You do not own this background, please buy it using `p!buybg ID` first.");
            if (msg.author.configs.get("profile-bg") === "sunset-palms") return msg.reply("That is already your current background, please enter another one.");
            await msg.author.configs.update("profile-bg", "sunset-palms");
            return msg.channel.send("<:penguSuccess:435712876506775553> ***Your Profile Background is now set to: `sunset-palms`***");
        }
        if (BackgroundID === 3) {
            if (!msg.author.configs.backgrounds.includes("cherry-blossoms")) return msg.reply("You do not own this background, please buy it using `p!buybg ID` first.");
            if (msg.author.configs.get("profile-bg") === "cherry-blossoms") return msg.reply("That is already your current background, please enter another one.");
            await msg.author.configs.update("profile-bg", "cherry-blossoms");
            return msg.channel.send("<:penguSuccess:435712876506775553> ***Your Profile Background is now set to: `cherry-blossoms`***");
        }
        return msg.reply("That is not a valid Background ID, find Background IDs and their Prices at: <https://github.com/AdityaTD/PenguBot/wiki/Profile-Backgrounds-and-Prices>");
    }

};
