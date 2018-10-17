const Command = require("../../../lib/structures/KlasaCommand");
const { RichDisplay } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["levelroles"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_LIST_LVLROLES_DESCRPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { roles } = msg.guild.settings.levelroles;
        if (!roles.length) return msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("CMD_NO_SELFROLES")}***`);
        const pages = new RichDisplay(new MessageEmbed()
            .setTitle("Use the reactions to change pages, select a page, or stop viewing the roles")
            .setAuthor("Level Based Roles - PenguBot", msg.guild.iconURL())
            .setDescription("Scroll between pages to see the self assignable roles.")
            .setColor("#428bca")
        );
        pages.addPage(t => t.setDescription(roles.map(role => `\`-\` ${msg.guild.roles.get(role.id) || "Role Removed"} - Level ${role.lvl}`).join("\n")));

        pages.run(await msg.sendMessage(`${this.client.emotes.loading} ***Loading Roles...***`), {
            time: 120000,
            filter: (reaction, user) => user === msg.author
        });
    }

};
