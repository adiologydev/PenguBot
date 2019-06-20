const MusicCommand = require("../../lib/structures/MusicCommand");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireDJ: true,
            requireMusic: true,
            upvoteOnly: true,
            cooldown: 8,
            aliases: ["pause", "resume"],
            permissionLevel: 2,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_PAUSE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        if (!music.playing) return msg.sendMessage(msg.language.get("MUSIC_NOT_PLAYING"));

        await music.pause();

        return msg.sendMessage(`⏯ | ***PenguBot has ${music.paused ? "paused" : "resumed"} the music!***`);
    }

};
