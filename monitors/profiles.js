const { Monitor } = require("klasa");
const { Canvas } = require("canvas-constructor");
const fs = require("fs-nextra");
const fetch = require("node-fetch");

const timeout = new Set();

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            enabled: true,
            ignoreBots: true,
            ignoreSelf: true,
            ignoreOthers: false
        });
    }

    async run(msg) {
        if (!msg.guild) return;
        if (timeout.has(msg.author.id)) return;

        const randomXP = this.client.functions.randomNumber(1, 10);
        const randomSnowflakes = this.client.functions.randomNumber(1, 20);

        const newXP = await msg.author.configs.get("xp") + randomXP;
        const oldLvl = await msg.author.configs.get("level");
        const newLvl = Math.floor(0.2 * Math.sqrt(newXP));
        await msg.author.configs.update(["xp", "level", "snowflakes"], [newXP, newLvl, randomSnowflakes]);

        timeout.add(msg.author.id);
        setTimeout(() => timeout.delete(msg.author.id), 60000);

        // Generate Level Up Images on Level Up
        if (oldLvl !== newLvl) {
            if (msg.guild.configs.get("level-ups") === true) {
                const levelBG = await fs.readFile(`${process.cwd()}/assets/profiles/levelup.png`);
                const avatar = await fetch(msg.author.displayAvatarURL({ format: "png", size: 128 })).then(res => res.buffer());
                const img = await new Canvas(100, 100)
                    .addImage(levelBG, 0, 0, 100, 100)
                    .addImage(avatar, 22, 22, 57, 57)
                    .toBufferAsync();
                msg.channel.send(`🆙 | **${msg.member} leveled up to Level ${newLvl}!**`, { files: [{ attachment: img, name: `${msg.author.id}.png` }] });
            }
        }
    }

    async init() {
        if (!this.client.gateways.users.schema.has("xp")) {
            this.client.gateways.users.schema.add("xp", { type: "integer", default: 0, configurable: false });
        }
        if (!this.client.gateways.users.schema.has("level")) {
            this.client.gateways.users.schema.add("level", { type: "integer", default: 0, configurable: false });
        }
        if (!this.client.gateways.users.schema.has("snowflakes")) {
            this.client.gateways.users.schema.add("snowflakes", { type: "integer", default: 0, configurable: false });
        }
    }

};
