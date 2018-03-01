const { Command } = require("discord.js-commando");

module.exports = class StopMusicCommand extends Command {

    constructor(client) {
        super(client, {
            name: "stop",
            aliases: ["stopmusic", "musicstop"],
            group: "music",
            memberName: "stop",
            description: "Stops the music and clears the queue.",
            details: "Only Moderators and Pengu DJs can use this command.",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 3
            }
        });
        this.queue = this.client.queue;
    }
    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_MESSAGES") || this.client.functions.isDJ(msg);
    }

    async run(msg) {
        const queue = this.queue.get(msg.guild.id);
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        if (!msg.member.voiceChannel) return msg.channel.send("❌ | You are not in a voice channel!");
        if (!queue || !queue.songs[0]) return msg.reply("❌ | No music is being played currently.");
        queue.songs = [];
        this.client.player.leave(msg.guild.id);
        this.client.queue.delete(msg.guild.id);
        msg.channel.send("⏹ | **Stopped:** Cleared The Queue and Stopped The Music.");
    }

};
