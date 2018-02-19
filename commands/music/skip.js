const { Command } = require("discord.js-commando");

module.exports = class SkipSongCommand extends Command {

    constructor(client) {
        super(client, {
            name: "skip",
            group: "music",
            memberName: "skip",
            description: "Skip the song which is being currently played.",
            details:
                ["If there are 3 people or less in the voice channel, the skip will be instant.",
                    "With at least 4 people, a vote skip will be started with 15 seconds till all the votes come.",
                    "The required amount of votes to successfully skip the song is one-third of the number of listeners.",
                    "Each vote will add 5 seconds to the voting timer.",
                    "DJ Pengu role people can use the \"force\" parameter, which will immediately skip the song without a vote."
                ].join("\n"),
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10
            }
        });

        this.votes = new Map();
    }

    async run(msg, args) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const queue = this.queue.get(msg.guild.id);
        if (!msg.member.voiceChannel) return msg.channel.send("You are not in a voice channel!");
        if (!queue) return msg.reply(":x: There are no songs being played right now.");
        if (!queue.voiceChannel.members.has(msg.author.id)) return msg.reply(":x: You're not in the voice channel.");
        if (!queue.songs) return msg.reply(`No songs in queue`);

        const threshold = Math.ceil((queue.voiceChannel.members.size - 1) / 3);
        const force = threshold <= 1 ||
    queue.voiceChannel.members.size < threshold ||
    (msg.member.hasPermission("MANAGE_MESSAGES") &&
    args.toLowerCase() === "force");
        if (force) return msg.reply(this.skip(msg.guild, queue));

        const vote = this.votes.get(msg.guild.id);
        if (vote && vote.count >= 1) {
            if (vote.users.some(user => user === msg.author.id)) return msg.reply("you've already voted to skip this song.");

            vote.count++;
            vote.users.push(msg.author.id);
            if (vote.count >= threshold) return msg.reply(this.skip(msg.guild, queue));

            const time = this.setTimeout(vote);
            const remaining = threshold - vote.count;

            return msg.say(`${vote.count} vote${vote.count > 1 ? "s" : ""} received so far, ${remaining} more ${remaining > 1 ? "are" : "is"} needed to skip this song. Five more seconds on the :clock1:! The vote will end in ${time} seconds.`); // eslint-disable-line max-len
        } else {
            const newVote = {
                count: 1,
                users: [msg.author.id],
                queue: queue,
                guild: msg.guild.id,
                start: Date.now(),
                timeout: null
            };

            const time = this.setTimeout(newVote);
            this.votes.set(msg.guild.id, newVote);
            const remaining = threshold - 1;

            return msg.say(`🕐 Starting a Vote Skip 🕐 ${remaining} more vote${remaining > 1 ? "s are" : " is"} required for this song to be skipped. The vote will end in ${time} seconds.`);
        }
    }

    skip(guild, queue) {
        if (this.votes.has(guild.id)) {
            clearTimeout(this.votes.get(guild.id).timeout);
            this.votes.delete(guild.id);
        }

        const song = queue.songs[0];
        if (!song) return `No song in queue`;
        queue.dispatcher.end("Skip command used");
        return `✅ Skipped: **${song.title}**`;
    }

    setTimeout(vote) {
        const time = vote.start + 15000 - Date.now() + ((vote.count - 1) * 5000);
        clearTimeout(vote.timeout);
        vote.timeout = setTimeout(() => {
            this.votes.delete(vote.guild);
            vote.queue.textChannel.send("✅ The vote to skip the current song has ended.");
        }, time);

        return Math.round(time / 1000);
    }

    get queue() {
        if (!this._queue) this._queue = this.client.registry.resolveCommand("music:play").queue;
        return this._queue;
    }

};
