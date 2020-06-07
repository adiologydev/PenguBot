const { Monitor } = require("../index");
const { Canvas } = require("canvas-constructor");
const fs = require("fs-nextra");

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
        if (!msg.guild || timeout.has(`${msg.author.id}-${msg.guild.id}`)) return;
        if (this.client.user.id !== "303181184718995457" && await msg.guild.members.fetch("303181184718995457").catch(() => null)) return;

        await msg.member.settings.sync(true);

        const randomXP = this.client.funcs.randomNumber(1, 5);
        const oldLevel = msg.member.settings.get("level");
        const newXP = msg.member.settings.get("xp") + randomXP;
        const newLevel = Math.floor(0.2 * Math.sqrt(newXP));
        await msg.member.settings.update([["xp", newXP], ["level", newLevel]]);

        timeout.add(`${msg.author.id}-${msg.guild.id}`);
        setTimeout(() => timeout.delete(`${msg.author.id}-${msg.guild.id}`), 45000);

        if (oldLevel === newLevel) return;

        const { settings } = msg.guild;

        if (settings.toggles.levelup && settings.misc.leveluptype === "guild") await this.handleLevelup(msg);
        if (settings.toggles.levelroles && settings.roles.levelrole.length) await this.leveledroles(msg);
    }

    async handleLevelup(msg) {
        if (!msg.channel.postable) return;

        const image = await this.generateLevelUpImage(msg.author.settings.get("profilebg"), msg.author.displayAvatarURL({ format: "png", size: 128 }));
        return msg.sendMessage(`🆙 | **${msg.author.tag}** has leveled up to **Level ${msg.member.settings.get("level")}** in **${msg.guild.name}**`, { files: [{ attachment: image, name: `${msg.author.id}.png` }] });
    }

    async leveledroles(msg) {
        const levelRoles = msg.guild.settings.get("roles.levelrole").filter(leveledRole => msg.member.settings.get("level") >= leveledRole.lvl);
        if (!levelRoles.length) return;

        const promises = [];

        for (const levelRole of levelRoles) {
            if (msg.member.roles.has(levelRole.id)) continue;

            const role = msg.guild.roles.get(levelRole.id);
            if (!role) continue;

            if (role.position >= msg.guild.me.roles.highest.position) continue;

            promises.push(msg.member.roles.add(role, "Level Based Role").catch(() => null));
        }

        await Promise.all(promises);
    }

    async generateLevelUpImage(background, userAvatar) {
        const [backgroundImage, avatar] = await Promise.all([
            fs.readFile(`../assets/profiles/bg/${background}.png`),
            this.fetchURL(userAvatar, { type: "buffer" }).catch(() => null)
        ]);

        return new Canvas(100, 100)
            .addImage(backgroundImage, 0, 0, 530, 530)
            .addImage(avatar, 22, 22, 57, 57)
            .toBufferAsync();
    }

};
