const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: false });
    }

    async run(msg, cmd) {
        if (!msg.guild || cmd.requireMusic !== true) return;

        const force = "force" in msg.flagArgs;

        await msg.guild.members.fetch(msg.author).catch(() => null);

        const { music } = msg.guild;

        if (!msg.member.voice.channel && !force) throw "You are not connected in a voice channel.";
        if (!music.voiceChannel) throw "I am not connected in a voice channel.";
        if (msg.member.voice.channel !== msg.guild.me.voice.channel && !force) throw "You must be in the same voice channel as me.";
        if (!music.queue.length) throw msg.language.get("MUSIC_NO_SONGS_IN_QUEUE");
    }

};
