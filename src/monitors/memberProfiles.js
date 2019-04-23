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
        if (timeout.has(`${msg.author.id}-${msg.guild.id}`)) return;

        if (this.client.user.id !== "303181184718995457" && msg.guild.members.has("303181184718995457")) return;

        await msg.member.settings.sync(true);

        const randomXP = this.client.funcs.randomNumber(1, 5);
        const oldLevel = msg.member.settings.level;
        const newXP = msg.member.settings.xp + randomXP;
        const newLevel = Math.floor(0.2 * Math.sqrt(newXP));
        await msg.member.settings.update([["xp", newXP], ["level", newLevel]]);

        timeout.add(`${msg.author.id}-${msg.guild.id}`);
        setTimeout(() => timeout.delete(`${msg.author.id}-${msg.guild.id}`), 45000);

        if (oldLevel === newLevel) return;

        const { settings } = msg.guild;

        if (settings.levelup && settings.leveltype === "guild") await this.handleLevelup(msg);
        if (settings.levelroles.enabled && settings.levelroles.roles.length) await this.leveledroles(msg);
    }

    async handleLevelup(msg) {
        if (!msg.channel.postable) return;

        const image = await this.generateLevelUpImage(msg.author.settings.profilebg, msg.author.displayAvatarURL({ format: "png", size: 128 }));
        return msg.sendMessage(`🆙 | **${msg.author.tag}** has leveled up to **Level ${msg.member.settings.level}** in **${msg.guild.name}**`, { files: [{ attachment: image, name: `${msg.author.id}.png` }] });
    }

    async leveledroles(msg) {
        const levelRole = msg.guild.settings.levelroles.roles.find(r => r.lvl === msg.member.settings.level);
        if (!levelRole) return;

        if (msg.member.roles.has(levelRole.id)) return;

        const role = msg.guild.roles.get(levelRole.id);
        if (!role) return;

        if (role.position >= msg.guild.me.roles.highest.position) return;

        await msg.member.roles.add(role, "Level Based Role").catch(() => null);
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
