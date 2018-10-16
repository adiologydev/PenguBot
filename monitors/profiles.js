const { Monitor } = require("klasa");
const { Canvas } = require("canvas-constructor");
const fs = require("fs-nextra");
const { get } = require("snekfetch");

const timeout = new Set();

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            ignoreBots: true,
            ignoreSelf: true,
            ignoreOthers: false
        });
    }

    async run(msg) {
        if (!msg.guild) return;
        if (timeout.has(msg.author.id)) return;

        if (this.client.user.id !== "303181184718995457") {
            const mainBot = await msg.guild.members.fetch("303181184718995457").catch(() => null);
            if (mainBot) return;
        }

        await msg.author.settings.sync(true);
        if (!msg.author.settings) return;

        const randomXP = this.client.funcs.randomNumber(1, 5);
        const randomSnowflakes = this.client.funcs.randomNumber(1, 2);
        const newSnowflakes = msg.author.settings.snowflakes + randomSnowflakes;
        const newXP = msg.author.settings.xp + randomXP;
        const oldLvl = msg.author.settings.level;
        const newLvl = Math.floor(0.2 * Math.sqrt(newXP));
        await msg.author.settings.update([["xp", newXP], ["level", newLvl], ["snowflakes", newSnowflakes]]);

        timeout.add(msg.author.id);
        setTimeout(() => timeout.delete(msg.author.id), 45000);

        // Generate Level Up Images on Level Up
        if (oldLvl !== newLvl) {
            if (!msg.guild.settings.levelup) return;
            if (msg.guild.settings.leveltype !== "user") return;
            if (!msg.channel.postable) return;
            const bgName = msg.author.settings.profilebg;
            const bgImg = await fs.readFile(`${process.cwd()}/assets/profiles/bg/${bgName}.png`);
            const avatar = await get(msg.author.displayAvatarURL({ format: "png", size: 128 })).then(res => res.body).catch(e => {
                Error.captureStackTrace(e);
                return e;
            });
            const img = await new Canvas(100, 100)
                .addImage(bgImg, 0, 0, 530, 530)
                .addImage(avatar, 22, 22, 57, 57)
                .toBufferAsync();
            msg.sendMessage(`🆙 | **${msg.author.tag} has leveled up to Level ${newLvl}!**`, { files: [{ attachment: img, name: `${msg.author.id}.png` }] });
        }
    }

};
