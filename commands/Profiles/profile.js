const { Command } = require("klasa");
const { Canvas } = require("canvas-constructor");
const fs = require("fs-nextra");
const { get } = require("snekfetch");

Canvas.registerFont(`${process.cwd()}/assets/fonts/Roboto-Regular.ttf`, { family: "Roboto" });
Canvas.registerFont(`${process.cwd()}/assets/fonts/RobotoCondensed-Regular.ttf`, { family: "Roboto Condensed" });
Canvas.registerFont(`${process.cwd()}/assets/fonts/RobotoMono-Light.ttf`, { family: "Roboto Mono" });
Canvas.registerFont(`${process.cwd()}/assets/fonts/NotoEmoji-Regular.ttf`, { family: "NotoEmoji" });

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 60,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
            description: msg => msg.language.get("COMMAND_PROFILE_DESCRIPTION"),
            usage: "[user:user]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [user = msg.author]) {
        if (user.bot) return msg.reply("Can not fetch bot profiles.");
        return msg.channel.sendFile(await this.createImage(user));
    }

    async createImage(user) {
        await user.configs._syncStatus;
        const { xp, level: lvl, snowflakes, reps, title } = user.configs;

        const oldLvl = Math.floor((lvl / 0.2) ** 2);
        const nextLvl = Math.floor(((lvl + 1) / 0.2) ** 2);
        const xpProg = Math.round(((xp - oldLvl) / (nextLvl - oldLvl)) * 269);

        let users;
        if (this.client.topCache) users = this.client.topCache;
        users = await this.client.providers.get("rethinkdb").getAll("users").then(res => res.sort((a, b) => b.xp - a.xp));
        this.client.topCache = users;
        let usersPos;
        if (this.client.uPosCache) usersPos = this.client.uPosCache;
        usersPos = users.filter(async a => await this.client.users.fetch(a.id));
        this.client.uPosCache = usersPos;
        const pos = usersPos.findIndex(i => i.id === user.id);

        const bgName = user.configs.profilebg;
        const bgImg = await fs.readFile(`${process.cwd()}/assets/profiles/bg/${bgName}.png`);
        const avatar = await get(user.displayAvatarURL({ format: "png", sze: 256 })).then(res => res.body).catch(e => {
            Error.captureStackTrace(e);
            return e;
        });

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
            .addText(`Global Rank: #${pos !== -1 ? pos + 1 : "???"}`, 30, 243, 193)
            // XP Bar
            .setColor("#459466")
            .addRect(21, 269, xpProg, 15.5)
            .setTextFont("10px Roboto")
            .setColor("#FFFFFF")
            .setTextAlign("center")
            .addText(`XP: ${xp} / ${nextLvl}`, 151, 281)
            .toBufferAsync();
    }

    async init() {
        if (!this.client.gateways.users.schema.has("profilebg")) {
            this.client.gateways.users.schema.add("profilebg", { type: "string", default: "default", configurable: false });
        }
        if (!this.client.gateways.users.schema.has("backgrounds")) {
            this.client.gateways.users.schema.add("backgrounds", { type: "string", default: ["default"], array: true, configurable: false });
        }
    }

};
