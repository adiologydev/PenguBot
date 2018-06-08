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
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
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
            const embed = new MessageEmbed()
                .setFooter("© PenguBot.com")
                .setTimestamp()
                .setDescription(`${Tone} | ${Ttwo} | ${Tthree}\n${Mone} | ${Mtwo} | ${Mthree}\n${Bone} | ${Btwo} | ${Bthree}`)
                .setColor("RANDOM");
            return msg.sendMessage(`***${msg.author} You just won! Good job!***`, { embed: embed });
        }
        const embed = new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setDescription(`${Tone} | ${Ttwo} | ${Tthree}\n${Mone} | ${Mtwo} | ${Mthree}\n${Bone} | ${Btwo} | ${Bthree}`)
            .setColor("RANDOM");
        return msg.sendMessage(`***${msg.author} You lost! Better luck next time!***`, { embed: embed });
    }

};
