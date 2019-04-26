const { Monitor } = require("../index");
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
        if (timeout.has(`${msg.guild.id}-${msg.author.id}`)) return;
        if (this.client.user.id !== "303181184718995457" && await msg.guild.members.fetch("303181184718995457").catch(() => null)) return;

        await msg.author.settings.sync(true);

        const randomXP = this.client.funcs.randomNumber(1, 5);
        const randomSnowflakes = this.client.funcs.randomNumber(1, 2);
        const newSnowflakes = msg.author.settings.snowflakes + randomSnowflakes;
        const newXP = msg.author.settings.xp + randomXP;
        const oldLevel = msg.author.settings.level;
        const newLevel = Math.floor(0.2 * Math.sqrt(newXP));
        await msg.author.settings.update([["xp", newXP], ["level", newLevel], ["snowflakes", newSnowflakes]]);

        timeout.add(`${msg.guild.id}-${msg.author.id}`);
        setTimeout(() => timeout.delete(`${msg.guild.id}-${msg.author.id}`), 45000);

        if (oldLevel === newLevel || !msg.guild.settings.levelup || msg.guild.settings.leveltype !== "user" || !msg.channel.postable) return;

        const image = await this.generateLevelUpImage(msg.author.settings.profilebg, msg.author.displayAvatarURL({ format: "png", size: 128 }));
        return msg.sendMessage(`🆙 | **${msg.author.tag} has leveled up to Level ${newLevel}!**`, { files: [{ attachment: image, name: `${msg.author.id}.png` }] });
    }

    async generateLevelUpImage(background, userAvatar) {
        const [backgroundImage, avatar] = await Promise.all([
            fs.readFile(`../assets/profiles/bg/${background}.png`),
            get(userAvatar).then(res => res.body).catch(() => null)
        ]);

        return new Canvas(100, 100)
            .addImage(backgroundImage, 0, 0, 530, 530)
            .addImage(avatar, 22, 22, 57, 57)
            .toBufferAsync();
    }

};
