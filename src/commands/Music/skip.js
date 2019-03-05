const MusicCommand = require("../../lib/structures/MusicCommand");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireDJ: true,
            requireMusic: true,
            cooldown: 8,
            aliases: ["loopsong", "repeat"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_SKIP_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
        this.votes = new Map();
    }

    async run(msg) {
        const { music } = msg.guild;
        const { queue } = music;

        if (!music.voiceChannel) throw `${this.client.emotes.cross} ***PenguBot is not connected to a voice channel.***`;
        const threshold = Math.ceil(music.voiceChannel.members.size / 3);
        const force = threshold <= 1 || music.voiceChannel < threshold || await msg.hasAtLeastPermissionLevel(3);

        if (force) return msg.reply(this.skip(msg.guild));

        const vote = this.votes.get(msg.guild.id);
        if (vote && vote.count >= 1) {
            if (vote.users.some(user => user === msg.author.id)) return msg.reply(`${this.client.emotes.cross} You've already voted to skip this song.`);

            vote.count++;
            vote.users.push(msg.author.id);
            if (vote.count >= threshold) return msg.reply(this.skip(msg.guild));

            const time = this.setTimeout(msg.channel, vote);
            const remaining = threshold - vote.count;

            return msg.sendMessage(`${vote.count} vote${vote.count > 1 ? "s" : ""} received so far, ${remaining} more ${remaining > 1 ? "are" : "is"} needed to skip this song. Five more seconds on the :clock1:! The vote will end in ${time} seconds.`); // eslint-disable-line max-len
        } else {
            const newVote = {
                count: 1,
                users: [msg.author.id],
                queue: queue,
                guild: msg.guild.id,
                start: Date.now(),
                timeout: null
            };

            const time = this.setTimeout(msg.channel, newVote);
            this.votes.set(msg.guild.id, newVote);
            const remaining = threshold - 1;

            return msg.sendMessage(`🕐 **Starting a Vote Skip:** ${remaining} more vote${remaining > 1 ? "s are" : " is"} required for this song to be skipped. The vote will end in ${time} seconds.`);
        }
    }

    skip(guild) {
        if (this.votes.has(guild.id)) {
            clearTimeout(this.votes.get(guild.id).timeout);
            this.votes.delete(guild.id);
        }

        const [song] = guild.music.queue;
        guild.music.skip();
        return `${this.client.emotes.check} Skipped: **${song ? song.title : "N/A"}**`;
    }

    setTimeout(textChannel, vote) {
        const time = vote.start + 15000 - Date.now() + ((vote.count - 1) * 5000);
        clearTimeout(vote.timeout);
        vote.timeout = setTimeout(() => {
            this.votes.delete(vote.guild);
            textChannel.send(`${this.client.emotes.check} The vote to skip the current song has ended.`);
        }, time);

        return Math.round(time / 1000);
    }

};
