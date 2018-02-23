const { Command } = require("discord.js-commando");

module.exports = class PauseSongCommand extends Command {

    constructor(client) {
        super(client, {
            name: "pause",
            aliases: ["pausemusic"],
            group: "music",
            memberName: "pause",
            description: "Pause the currently playing song.",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR") || this.client.functions.isDJ(msg);
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        if (!msg.member.voiceChannel) return msg.channel.send("You are not in a voice channel!");
        const queue = this.client.queue.get(msg.guild.id);
        if (!queue) return msg.reply(`❌ There is currently no music playing.`);
        if (!queue.connection) return msg.reply("❌ I can't pause a song that isn't playing yet.");
        if (!queue.playing) return msg.reply("❌ The song is already paused.");

        const patron = await await this.client.functions.isPatreon(msg);
        if (!patron) {
            return msg.reply(`:x: This command is Patron only. Why not consider becoming one? <https://patreon.com/PenguBot>`);
        }

        queue.connection.pause();
        queue.playing = false;
        return msg.reply(`✅ Paused the music. Use \`${this.client.commandPrefix}resume\` to resume playing.`);
    }

};
