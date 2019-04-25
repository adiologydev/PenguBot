const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: false });
    }

    async run(msg, cmd) {
        if (cmd.requireMusic !== true) return;
        if (msg.channel.type !== "text") throw "This command may be only executed in a server.";

        const force = "force" in msg.flags;

        const m = await msg.guild.members.fetch(msg.author).catch(() => null);
        if (!m) throw "There was a technical oopsie, please try again!";

        if ((!msg.member.voice.channel && !force) || !msg.member.voice) throw "You are not connected in a voice channel.";
        if (!msg.guild.me || !msg.guild.me.voice || !msg.guild.me.voice.channel) throw "I am not connected in a voice channel.";
        if (msg.member.voice.channel !== msg.guild.me.voice.channel && !force) throw "You must be in the same voice channel as me.";
    }

};
