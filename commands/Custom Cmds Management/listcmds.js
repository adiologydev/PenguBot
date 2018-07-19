const { Command, RichDisplay } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["listcommands"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: msg => msg.language.get("COMMAND_LIST_CMDS_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild.configs.customcmds.cmds[0] === undefined) return msg.reply(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_NO_CMDS")}***`);
        const prefix = msg.guild.configs.get("prefix");
        const names = msg.guild.configs.customcmds.cmds.map(cmd => cmd.name);

        const cmds = new RichDisplay(new MessageEmbed()
            .setTitle("Use the reactions to change pages, select a page or stop viewing the commands.")
            .setAuthor("Custom Commands - PenguBot", "https://i.imgur.com/DOuCQlY.png")
            .setDescription("Scroll between pages to see the custom commands list.")
            .setColor("#F75F4E")
        );

        for (let i = 0, temp = names.length; i < temp; i += 5) {
            const curr = names.slice(i, i + 5);
            cmds.addPage(t => t.setDescription(curr.map(c => `• ${prefix}${c}`)));
        }

        cmds.run(await msg.sendMessage("<a:penguLoad:435712860744581120> Loading Commands..."), {
            time: 120000,
            filter: (reaction, user) => user === msg.author
        });
    }

};
