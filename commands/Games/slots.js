const { Command } = require("klasa");
const slots = ["🍔", "🍟", "🌭", "🍕", "🌮", "🍘", "🍫", "🍿", "🍩"];
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["slotsroll"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: msg => msg.language.get("COMMAND_SLOTS_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "[Snowflakes:integer]"
        });
    }

    async run(msg, [Snowflakes = 1]) {
        if (Snowflakes < 1) return msg.reply("The specified amount of Snowflakes is invalid, please enter at least 1 or more Snowflakes.");
        await msg.author.configs._syncStatus;
        if (msg.author.configs.snowflakes < Snowflakes) return msg.reply(`❄ You don't have \`${Snowflakes}\` Snowflakes to use slots, use \`${msg.guild.configs.prefix}daily\` command to get some for free!`);

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
            const flakesPercent = Math.round(Snowflakes * 50 / 100) >= 1 ? Math.round(Snowflakes * 50 / 100) : 1;
            const winFlakes = msg.author.configs.snowflakes + Snowflakes + flakesPercent;
            const embed = new MessageEmbed()
                .setFooter("© PenguBot.com")
                .setTimestamp()
                .setDescription(`${Tone} | ${Ttwo} | ${Tthree}\n${Mone} | ${Mtwo} | ${Mthree}\n${Bone} | ${Btwo} | ${Bthree}`)
                .setColor("RANDOM");
            await msg.author.configs.update("snowflakes", winFlakes);
            return msg.sendMessage(`***${msg.author} You just won ❄ \`${flakesPercent}\`, you now have ❄ \`${msg.author.configs.snowflakes}\`! Good job!***`, { embed: embed });
        }
        const embed = new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setDescription(`${Tone} | ${Ttwo} | ${Tthree}\n${Mone} | ${Mtwo} | ${Mthree}\n${Bone} | ${Btwo} | ${Bthree}`)
            .setColor("RANDOM");
        await msg.author.configs.update("snowflakes", msg.author.configs.snowflakes - Snowflakes);
        return msg.sendMessage(`***${msg.author} You lost ❄ \`${Snowflakes}\`, you now have ❄ \`${msg.author.configs.snowflakes}\`! Better luck next time!***`, { embed: embed });
    }

};
