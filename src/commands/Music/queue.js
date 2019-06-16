const MusicCommand = require("../../lib/structures/MusicCommand");
const { RichDisplay } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            cooldown: 10,
            aliases: ["stopmusic", "leave"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS", "MANAGE_MESSAGES"],
            description: language => language.get("COMMAND_QUEUE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { music } = msg.guild;

        if (!music.playing) return msg.sendMessage(msg.language.get("MUSIC_NOT_PLAYING"));
        if (!music.queue.length) return msg.sendMessage(msg.language.get("MUSIC_NO_SONGS_IN_QUEUE"));

        const pages = new RichDisplay(new MessageEmbed()
            .setTitle(`${msg.language.get("MUSICIF_QUEUE_TITLE")}`)
            .setAuthor(`PenguBot - Music Queue`, "https://i.imgur.com/IS8hX4t.png")
            .setDescription(`"${msg.language.get("MUSICIF_QUEUE_HINT")}`)
            .setColor("#428bca")
        );

        for (let i = 0; i < music.queue.length; i += 12) {
            const curr = music.queue.slice(i, i + 12);
            pages.addPage(t => t.setDescription(curr.map(y => `\`${music.queue.findIndex(s => s.id === y.id) + 1}\` [${y.title.replace(/\*/g, "\\*")}](${y.url}) (${y.friendlyDuration})`).join("\n")));
        }
        pages.run(await msg.sendMessage(`${this.client.emotes.loading} ${msg.language.get("MUSICIF_QUEUE_LOADING")}`), {
            time: 120000,
            filter: (reaction, user) => user === msg.author
        });
    }

};
