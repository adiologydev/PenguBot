const { Command } = require("discord.js-commando");

module.exports = class AfkCmd extends Command {

    constructor(client) {
        super(client, {
            name: "afk",
            aliases: ["awayfromkeyboard"],
            group: "utilities",
            memberName: "afk",
            description: "Set yourself Away From Keyboard.",
            examples: ["<prefix>afk [reason]"],
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: "reason",
                prompt: "Please enter a reason why you're AFK.\n",
                default: "none",
                type: "string"
            }]
        });
    }

    async run(msg, { reason }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        if (msg.guild.settings.get(`${msg.author.id}.afk`)) {
            msg.guild.settings.remove(`${msg.author.id}.afk`).then(() => {
                msg.reply("❌ Removed you from AFK.");
            }).catch(console.log);
        } else {
            msg.guild.settings.set(`${msg.author.id}.afk`, reason).then(() => {
                msg.reply(`✅ I've set you AFK for: ${reason}`);
            }).catch(console.log);
        }
    }

};
