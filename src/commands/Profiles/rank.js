const Command = require("../../lib/structures/KlasaCommand");
const { Canvas } = require("canvas-constructor");
const fs = require("fs-nextra");
const { get } = require("snekfetch");
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
            description: language => language.get("COMMAND_RANK_DESCRIPTION"),
            usage: "[user:membername]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [user = msg.member]) {
        if (user.bot) return msg.reply("Can not fetch bot's ranks.");
        const load = await msg.sendMessage(`${this.client.emotes.loading} ***Let me process all that data through my igloo, give me a few...***`);
        msg.sendMessage(`#⃣  **${user.user.username}'s** Rank Card for **${msg.guild.name}**`, { files: [{ attachment: await this.createImage(user), name: `${msg.author.username}.png` }] });
        return load.delete().catch(() => null);
    }

    async createImage(member) {
        await member.settings.sync(true);
        await member.user.settings.sync(true);
        const r = this.client.providers.default.db;
        const { xp, level: lvl } = member.settings;

        const oldLvl = Math.floor((lvl / 0.2) ** 2);
        const nextLvl = Math.floor(((lvl + 1) / 0.2) ** 2);
        const xpProg = Math.round(((xp - oldLvl) / (nextLvl - oldLvl)) * 645);

        const data = await r.table("members")
            .getAll(member.guild.id, { index: "guildID" })
            .orderBy(r.desc("xp"))
            .run();

        const rank = data.findIndex(i => i.id.split(".")[1] === member.user.id) + 1;

        const bgName = member.user.settings.profilebg;
        const bgImg = await fs.readFile(`../assets/profiles/backgrounds/${bgName}.png`);
        const template = await fs.readFile(`../assets/profiles/backgrounds/template.png`);
        const pbar = await fs.readFile(`../assets/profiles/backgrounds/progressbar.png`);
        const avatar = await get(member.user.displayAvatarURL({ format: "png", sze: 256 })).then(res => res.body).catch(e => {
            Error.captureStackTrace(e);
            return e;
        });

        const render = await new Canvas(1000, 300)
            // Initializing and Text
            .addImage(bgImg, 30, 0, 300, 300)
            .addImage(template, 10, 0, 1000, 300)
            .setTextFont("41.67px Roboto, NotoEmoji")
            .setColor("#212121")
            .addResponsiveText(member.user.username, 570, 86, 260)
            .setTextFont("25px Roboto")
            .setColor("#404040")
            .addText(`#${member.user.discriminator}`, 570, 110)
            .save()
            // Other Text
            .setColor("#212121")
            .setTextFont("33.33px Roboto")
            .addText(`Server Rank: #${rank.toLocaleString()}`, 568, 158)
            .addText(`Server Level: ${lvl.toLocaleString()}`, 568, 189)
            .save()
            // Avatar and Progress
            .addBeveledImage(avatar, 370, 34, 174, 174, 35)
            .restore()
            .createBeveledClip(315, 233, xpProg, 37, 70)
            .setColor("#212121")
            .addImage(pbar, 315, 233, 646, 36)
            // .addRect(315, 233, xpProg, 37)
            .restore()
            .setTextAlign("center")
            .setTextFont("22px Roboto")
            .setColor("#212121")
            .save();

        if (xpProg >= 305) {
            render.restore();
            render.setColor("#F1F1F1");
        } else {
            render.restore();
        }
        render.addText(`XP: ${xp} / ${nextLvl}`, 627, 260);
        return render.toBufferAsync();
        // 304, 268
    }

};
