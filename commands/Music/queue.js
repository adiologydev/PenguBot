const { Command, RichDisplay } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["stopmusic", "leave"],
            permissionLevel: 0,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS", "MANAGE_MESSAGES"],
            description: (msg) => msg.language.get("COMMAND_QUEUE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const queue = this.client.queue.get(msg.guild.id);
        const player = this.client.lavalink.get(msg.guild.id);
        if (!queue || !player) return msg.channel.send("<:penguError:435712890884849664> ***There's currently no music playing!***");

        const pages = new RichDisplay(new MessageEmbed()
            .setTitle("Use the reactions to change pages, select a page or stop viewing the queue.")
            .setAuthor("Queue - PenguBot", "https://i.imgur.com/IS8hX4t.png")
            .setDescription("Scroll between pages to see the song queue.")
            .setColor("#428bca")
        );

        for (let i = 0, temp = queue.songs.length; i < temp; i += 5) {
            const curr = queue.songs.slice(i, i + 5);
            pages.addPage(t => t.setDescription(curr.map(y => `\`-\` [${y.name.replace(/\*/g, "\\*")}](${y.url}) (${this.client.functions.friendlyTime(y.length)})`)));
        }
        pages.run(await msg.sendMessage("<a:penguLoad:435712860744581120> Loading Queue..."), {
            time: 120000,
            filter: (reaction, user) => user === msg.author
        });
    }

};
