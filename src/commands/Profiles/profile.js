const Command = require("../../lib/structures/KlasaCommand");
const { Canvas } = require("canvas-constructor");
const fs = require("fs-nextra");
const { join } = require("path");

Canvas.registerFont(join(__dirname, "..", "..", "..", "assets", "fonts", "Roboto-Regular.ttf"), "Roboto");
Canvas.registerFont(join(__dirname, "..", "..", "..", "assets", "fonts", "RobotoCondensed-Regular.ttf"), "Roboto Condensed");
Canvas.registerFont(join(__dirname, "..", "..", "..", "assets", "fonts", "RobotoMono-Light.ttf"), "Roboto Mono");
Canvas.registerFont(join(__dirname, "..", "..", "..", "assets", "fonts", "NotoEmoji-Regular.ttf"), "NotoEmoji");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 60,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
            description: language => language.get("COMMAND_PROFILE_DESCRIPTION"),
            usage: "[user:username]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [user = msg.author]) {
        if (user.bot) return msg.reply("Can not fetch bot profiles.");
        const load = await msg.sendMessage(`${this.client.emotes.loading} ***Let me process all that data through my igloo, give me a few...***`);
        msg.channel.sendFile(await this.createImage(user));
        return load.delete();
    }

    async createImage(user) {
        await user.settings.sync(true);
        const r = this.client.providers.default.db;
        const xp = user.settings.get("xp");
        const lvl = user.settings.get("level");
        const snowflakes = user.settings.get("snowflakes");
        const reps = user.settings.get("reps");
        const title = user.settings.get("title");

        const oldLvl = Math.floor((lvl / 0.2) ** 2);
        const nextLvl = Math.floor(((lvl + 1) / 0.2) ** 2);
        const xpProg = Math.round(((xp - oldLvl) / (nextLvl - oldLvl)) * 269);

        const query = await r.db("pengubot").table("users").orderBy({ index: r.desc("xp") }).pluck("id", "xp").limit(10000).offsetsOf(r.row("id").eq(user.id))
            .run();
        const pos = query.length ? `#${Number(query) + 1}` : "More Than 10,000";

        const bgName = user.settings.get("profilebg");
        const bgImg = await fs.readFile(`../assets/profiles/bg/${bgName}.png`);
        const avatar = await this.fetchURL(user.displayAvatarURL({ format: "png", sze: 256 }), { type: "buffer" });

        return await new Canvas(300, 300)
            // Initializing & Avatar
            .addImage(bgImg, 0, 0, 300, 300)
            .addImage(avatar, 27, 57, 86, 86)
            .setTextFont("20px Roboto, NotoEmoji")
            .setColor("#F2F2F2")
            .addResponsiveText(user.tag, 120, 120, 160)
            .setTextFont("18px Roboto")
            .addText(`Level: ${lvl}`, 120, 150)
            // Reps
            .setTextFont("12px Roboto, NotoEmoji")
            .setColor("#0a0a0a")
            .setTextAlign("center")
            .addText(`${reps}rep(s)`, 70, 159)
            // Main Content
            .setTextAlign("left")
            .addText(`Title: ${title}`, 30, 196, 193)
            .addText(`Snowflakes: ${snowflakes.toLocaleString()}`, 30, 219, 193)
            .addText(`Global Rank: ${pos}`, 30, 243, 193)
            // XP Bar
            .setColor("#459466")
            .addRect(21, 269, xpProg, 15.5)
            .setTextFont("10px Roboto")
            .setColor("#FFFFFF")
            .setTextAlign("center")
            .addText(`XP: ${xp} / ${nextLvl}`, 151, 281)
            .toBufferAsync();
    }

};
