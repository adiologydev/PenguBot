const { Command, RichDisplay } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            permissionLevel: 0,
            aliases: ["listbgs", "listbackgrounds", "listprofilebg"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_LISTBG_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const list = msg.author.configs.backgrounds;
        const bgs = new RichDisplay(new MessageEmbed()
            .setTitle("Use the reactions to change pages, select a page or stop viewing the list.")
            .setAuthor("Profile Backgrounds You Own - PenguBot", "https://i.imgur.com/oq9kgaR.png")
            .setDescription("Scroll between pages to see the profile backgrounds list you own.")
            .setColor("#F75F4E")
        );

        for (let i = 0, temp = list.length; i < temp; i += 5) {
            const curr = list.slice(i, i + 5);
            bgs.addPage(t => t.setDescription(curr.map(c => `• ${c}`)));
        }

        bgs.run(await msg.sendMessage("<a:penguLoad:435712860744581120> Loading List..."), {
            time: 120000,
            filter: (reaction, user) => user === msg.author
        });
    }

};
