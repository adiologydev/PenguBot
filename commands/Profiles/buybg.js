const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            permissionLevel: 0,
            aliases: ["buybackground", "buyprofilebg"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_BGBUY_DESCRIPTION"),
            usage: "[BackgroundID:integer]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [BackgroundID]) {
        if (!BackgroundID) return msg.reply("Please enter a **Background ID** in order to buy a background, you can look up the background names and prices at: <https://github.com/AdityaTD/PenguBot/wiki/Profile-Backgrounds-and-Prices>");
        if (BackgroundID === 1) return msg.reply("You already own this background.");
        if (BackgroundID === 2) {
            if (msg.author.configs.backgrounds.includes("sunset-palms")) return msg.reply("You already own this background.");
            if (!this.hasBalance(msg.author, 1000)) return msg.reply("Insufficient Snowflakes in your account to buy this background, please try again later.");
            await msg.author.configs.update(["snowflakes", "backgrounds"], [msg.author.configs.snowflakes - 1000, "sunset-palms"]);
            return msg.channel.send("<:penguSuccess:435712876506775553> ***You just bought and unlocked: `sunny-palms`.***");
        }
        if (BackgroundID === 3) {
            if (msg.author.configs.backgrounds.includes("cherry-blossoms")) return msg.reply("You already own this background.");
            if (!this.hasBalance(msg.author, 1000)) return msg.reply("Insufficient Snowflakes in your account to buy this background, please try again later.");
            await msg.author.configs.update(["snowflakes", "backgrounds"], [msg.author.configs.snowflakes - 1000, "cherry-blossoms"]);
            return msg.channel.send("<:penguSuccess:435712876506775553> ***You just bought and unlocked: `cherry-blossoms`.***");
        }
        return msg.reply("That is not a valid Background ID, find Background IDs and their Prices at: <https://github.com/AdityaTD/PenguBot/wiki/Profile-Backgrounds-and-Prices>");
    }
    async init() {
        if (!this.client.gateways.users.schema.has("backgrounds")) {
            this.client.gateways.users.schema.add("backgrounds", { type: "string", default: ["default"], configurable: false, array: true });
        }
    }

    hasBalance(author, snowflakes) {
        if (author.configs.snowflakes >= snowflakes) return true;
        return false;
    }

};
