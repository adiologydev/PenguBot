const MusicCommand = require("../../lib/structures/MusicCommand");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireMusic: true,
            runIn: ["text"],
            cooldown: 10,
            aliases: ["loopsong", "repeat"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: msg => msg.language.get("COMMAND_LOOP_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        if (!music.playing) return msg.sendMessage("<:penguError:435712890884849664> There's currently no music playing!");
        if (msg.member.voiceChannelID !== msg.guild.me.voiceChannelID) return msg.sendMessage("<:penguError:435712890884849664> You're currently not in a voice channel or there was an error, try again.");

        music.looping = !music.looping;
        return msg.sendMessage(`⏯ | ***Song looping is now ${music.looping ? "Enabled" : "Disabled"}***`);
    }

};
