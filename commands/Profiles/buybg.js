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
            return msg.channel.send("<:penguSuccess:435712876506775553> ***You just bought and unlocked: `sunset-palms`.***");
        }
        if (BackgroundID === 3) {
            if (msg.author.configs.backgrounds.includes("cherry-blossoms")) return msg.reply("You already own this background.");
            if (!this.hasBalance(msg.author, 1000)) return msg.reply("Insufficient Snowflakes in your account to buy this background, please try again later.");
            await msg.author.configs.update(["snowflakes", "backgrounds"], [msg.author.configs.snowflakes - 1000, "cherry-blossoms"]);
            return msg.channel.send("<:penguSuccess:435712876506775553> ***You just bought and unlocked: `cherry-blossoms`.***");
        }
        if (BackgroundID === 4) {
            if (msg.author.configs.backgrounds.includes("butterflies")) return msg.reply("You already own this background.");
            if (!this.hasBalance(msg.author, 1000)) return msg.reply("Insufficient Snowflakes in your account to buy this background, please try again later.");
            await msg.author.configs.update(["snowflakes", "backgrounds"], [msg.author.configs.snowflakes - 1000, "butterflies"]);
            return msg.channel.send("<:penguSuccess:435712876506775553> ***You just bought and unlocked: `butterflies`.***");
        }
        if (BackgroundID === 5) {
            if (msg.author.configs.backgrounds.includes("sunset-tree")) return msg.reply("You already own this background.");
            if (!this.hasBalance(msg.author, 1250)) return msg.reply("Insufficient Snowflakes in your account to buy this background, please try again later.");
            await msg.author.configs.update(["snowflakes", "backgrounds"], [msg.author.configs.snowflakes - 1250, "sunset-tree"]);
            return msg.channel.send("<:penguSuccess:435712876506775553> ***You just bought and unlocked: `sunset-tree`.***");
        }
        if (BackgroundID === 6) {
            if (msg.author.configs.backgrounds.includes("birdie")) return msg.reply("You already own this background.");
            if (!this.hasBalance(msg.author, 1250)) return msg.reply("Insufficient Snowflakes in your account to buy this background, please try again later.");
            await msg.author.configs.update(["snowflakes", "backgrounds"], [msg.author.configs.snowflakes - 1250, "birdie"]);
            return msg.channel.send("<:penguSuccess:435712876506775553> ***You just bought and unlocked: `birdie`.***");
        }
        if (BackgroundID === 7) {
            if (msg.author.configs.backgrounds.includes("tracks")) return msg.reply("You already own this background.");
            if (!this.hasBalance(msg.author, 1500)) return msg.reply("Insufficient Snowflakes in your account to buy this background, please try again later.");
            await msg.author.configs.update(["snowflakes", "backgrounds"], [msg.author.configs.snowflakes - 1500, "tracks"]);
            return msg.channel.send("<:penguSuccess:435712876506775553> ***You just bought and unlocked: `tracks`.***");
        }
        if (BackgroundID === 8) {
            if (msg.author.configs.backgrounds.includes("stars")) return msg.reply("You already own this background.");
            if (!this.hasBalance(msg.author, 1500)) return msg.reply("Insufficient Snowflakes in your account to buy this background, please try again later.");
            await msg.author.configs.update(["snowflakes", "backgrounds"], [msg.author.configs.snowflakes - 1500, "stars"]);
            return msg.channel.send("<:penguSuccess:435712876506775553> ***You just bought and unlocked: `stars`.***");
        }
        if (BackgroundID === 9) {
            if (msg.author.configs.backgrounds.includes("people")) return msg.reply("You already own this background.");
            if (!this.hasBalance(msg.author, 1850)) return msg.reply("Insufficient Snowflakes in your account to buy this background, please try again later.");
            await msg.author.configs.update(["snowflakes", "backgrounds"], [msg.author.configs.snowflakes - 1850, "people"]);
            return msg.channel.send("<:penguSuccess:435712876506775553> ***You just bought and unlocked: `people`.***");
        }
        if (BackgroundID === 10) {
            if (msg.author.configs.backgrounds.includes("courtyard")) return msg.reply("You already own this background.");
            if (!this.hasBalance(msg.author, 2000)) return msg.reply("Insufficient Snowflakes in your account to buy this background, please try again later.");
            await msg.author.configs.update(["snowflakes", "backgrounds"], [msg.author.configs.snowflakes - 2000, "courtyard"]);
            return msg.channel.send("<:penguSuccess:435712876506775553> ***You just bought and unlocked: `courtyard`.***");
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
