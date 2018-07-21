const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: true });
    }

    async run(msg, cmd) {
        if (cmd.requireMusic !== true) return;
        if (msg.channel.type !== "text") throw "This command may be only executed in a server.";

        const force = "force" in msg.flags;

        await msg.guild.members.fetch(msg.author);

        if (!msg.member.voiceChannel && !force) throw "You are not connected in a voice channel.";
        if (!msg.guild.me.voiceChannel) throw "I am not connected in a voice channel.";
        if (msg.member.voiceChannel !== msg.guild.me.voiceChannel && !force) throw "You must be in the same voice channel as me.";
    }

};
