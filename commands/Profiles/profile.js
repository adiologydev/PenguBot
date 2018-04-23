const { Command } = require("klasa");
const { Canvas } = require("canvas-constructor");
const fs = require("fs-nextra");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 30,
            permLevel: 0,
            botPerms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
            description: (msg) => msg.language.get("COMMAND_PROFILE_DESCRIPTION"),
            usage: "[user:user]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [user = msg.author]) {
        if (user.bot) return msg.reply("Can not fetch bot profiles.");
        return msg.channel.sendFile(await this.createImage(user));
    }

    async createImage(user) {
        const xp = await user.configs.get("xp");
        const lvl = await user.configs.get("level");
        const snowflakes = await user.configs.get("snowflakes");
        const reps = await user.configs.get("reps");
        const title = await user.configs.get("title");

        const oldLvl = Math.floor((lvl / 0.2) ** 2);
        const nextLvl = Math.floor(((lvl + 1) / 0.2) ** 2);
        const xpProg = Math.round(((xp - oldLvl) / (nextLvl - oldLvl)) * 269);

        const bgName = await user.configs.get("profile-bg");
        const bgImg = await fs.readFile(`${process.cwd()}/assets/profiles/bg/${bgName}.png`);
        const avatar = await get(user.displayAvatarURL({ format: "png", sze: 256 })).then(res => res.body);

        return await new Canvas(300, 300)
            // Initializing & Avatar
            .addImage(bgImg, 0, 0, 300, 300)
            .addImage(avatar, 27, 57, 87, 87)
            .setTextFont("20px RobotoRegular")
            .setColor("#F2F2F2")
            .addResponsiveText(user.tag, 120, 120, 279)
            .setTextFont("18px RobotoRegular")
            .addText(`Level: ${lvl}`, 120, 150)
            // Reps
            .setTextFont("12px RobotoRegular")
            .setColor("#0a0a0a")
            .setTextAlign("center")
            .addText(`${reps}rep(s)`, 70, 159)
            // Main Content
            .setTextAlign("left")
            .addText(`Title: ${title}`, 30, 196, 193)
            .addText(`Snowflakes: ${snowflakes}`, 30, 219, 193)
            .addText(`Global Rank: Coming Soon`, 30, 243, 193)
            // XP Bar
            .setColor("#459466")
            .addRect(21, 269, xpProg, 15.5)
            .setTextFont("10px RobotoRegular")
            .setColor("#FFFFFF")
            .setTextAlign("center")
            .addText(`XP: ${oldLvl} / ${nextLvl}`, 151, 281)
            .toBufferAsync();
    }

    async init() {
        if (!this.client.gateways.users.schema.has("profile-bg")) {
            this.client.gateways.users.schema.add("profile-bg", { type: "string", default: "default", configurable: false });
        }
    }

};
