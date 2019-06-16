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

        if (music.voiceChannel.members.size > 4) {
            if ("force" in msg.flags) {
                const hasPermission = await msg.hasAtLeastPermissionLevel(2);
                if (hasPermission === false) throw "You can't execute this command with the force flag. You must be a DJ.";
            } else {
                const response = this.handleSkips(music, msg.author.id);
                if (response) return msg.send(response);
            }
        }

        const [song] = music.queue;
        await music.skip(true);

        return msg.send(`Skipped ${song.title}`);
    }

    handleSkips(musicInterface, user) {
        const [song] = musicInterface.queue;
        if (song.skips.has(user)) return "You have already voted to skip this song.";
        song.skips.add(user);
        const members = musicInterface.voiceChannel.members.size - 1;
        return this.shouldInhibit(members, song.skips.size);
    }

    shouldInhibit(total, size) {
        if (total <= 3) return true;
        return size >= total * 0.4 ? false : `🔸 | Votes: ${size} of ${Math.ceil(total * 0.4)}`;
    }

};
