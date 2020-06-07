const Command = require("../../lib/structures/KlasaCommand");
const slots = ["🍔", "🍟", "🌭", "🍕", "🌮", "🍘", "🍫", "🍿", "🍩"];
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["slotsroll"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_SLOTS_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "[Snowflakes:integer]"
        });
    }

    async run(msg, [Snowflakes = 1]) {
        if (Snowflakes < 1) return msg.reply(`${msg.language.get("CMD_SLOTS_INVALID")}`);
        await msg.author.settings.sync(true);
        if (msg.author.settings.get("snowflakes") < Snowflakes) return msg.reply(`❄ You don't have \`${Snowflakes}\` Snowflakes to use slots, use \`${msg.guild.settings.prefix}daily\` command to get some for free!`);

        const Mone = slots[Math.floor(Math.random() * slots.length)];
        const Mtwo = slots[Math.floor(Math.random() * slots.length)];
        const Mthree = slots[Math.floor(Math.random() * slots.length)];
        const Tone = slots[Math.floor(Math.random() * slots.length)];
        const Ttwo = slots[Math.floor(Math.random() * slots.length)];
        const Tthree = slots[Math.floor(Math.random() * slots.length)];
        const Bone = slots[Math.floor(Math.random() * slots.length)];
        const Btwo = slots[Math.floor(Math.random() * slots.length)];
        const Bthree = slots[Math.floor(Math.random() * slots.length)];

        if (Mone === Mtwo || Mone === Mthree || Mthree === Mtwo) {
            const flakesPercent = Math.round(Snowflakes * 60 / 100) >= 1 ? Math.round(Snowflakes * 50 / 100) : 1;
            const winFlakes = msg.author.settings.get("snowflakes") + Snowflakes + flakesPercent;
            const embed = new MessageEmbed()
                .setFooter("© PenguBot.com")
                .setTimestamp()
                .setDescription(`${Tone} | ${Ttwo} | ${Tthree}\n${Mone} | ${Mtwo} | ${Mthree}\n${Bone} | ${Btwo} | ${Bthree}`)
                .setColor("#43A047");
            await msg.author.settings.update("snowflakes", winFlakes);
            return msg.sendMessage(`***${msg.author} You just won ❄ \`${flakesPercent}\`, you now have ❄ \`${msg.author.settings.get("snowflakes")}\`! Good job!***`, { embed: embed });
        }
        const embed = new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setDescription(`${Tone} | ${Ttwo} | ${Tthree}\n${Mone} | ${Mtwo} | ${Mthree}\n${Bone} | ${Btwo} | ${Bthree}`)
            .setColor("#d32f2f");
        await msg.author.settings.update("snowflakes", msg.author.settings.get("snowflakes") - Snowflakes);
        return msg.sendMessage(`***${msg.author} You lost ❄ \`${Snowflakes}\`, you now have ❄ \`${msg.author.settings.get("snowflakes")}\`! Better luck next time!***`, { embed: embed });
    }

};
