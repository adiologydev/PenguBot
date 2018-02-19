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
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_MESSAGES") || this.client.functions.isDJ(msg);
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        if (!msg.member.voiceChannel) return msg.channel.send("You are not in a voice channel!");
        const queue = this.queue.get(msg.guild.id);
        if (!queue) return msg.reply("❌ No music is being played currently.");
        queue.songs = [];
        queue.dispatcher.end("Stop command has been used!");
    }

    get queue() {
        if (!this._queue) this._queue = this.client.registry.resolveCommand("music:play").queue;
        return this._queue;
    }

};
