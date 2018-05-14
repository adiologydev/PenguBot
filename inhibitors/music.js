const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: true });
    }

    async run(msg, cmd) {
        if (cmd.Music !== true) return;

        if (!msg.member) {
            await msg.guild.members.fetch(msg.author.id).catch(() => {
                throw "Unable to fetch your user data due to a Discord Issue, wait a bit then try again.";
            });
        }

        if (msg.channel.type !== "text") throw "I am not a Wizard, can't do these commands in a DM you silly goose!";
        if (!msg.member.voiceChannel) throw "So you want me to make you hear music when you're not even in a VC? Join one to use this feature";
        if (!msg.guild.me.voiceChannel) throw "Cmon now we can't work like this, you need to add some records to play";
        if (msg.member.voiceChannel !== msg.guild.me.voiceChannel) throw "You're not in the same Voice Channel as me, I can't work like this.";
    }

};
