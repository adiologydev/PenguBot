const MusicCommand = require("../../lib/structures/MusicCommand");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireMusic: true,
            runIn: ["text"],
            cooldown: 10,
            aliases: ["shufflequeue", "queueshuffle"],
            permissionLevel: 0,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: msg => msg.language.get("COMMAND_SHUFFLE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        const { queue } = music;
        if (!music.playing) return msg.sendMessage("<:penguError:435712890884849664> There's currently no music playing!");
        if (msg.member.voiceChannelID !== msg.guild.me.voiceChannelID) return msg.sendMessage("<:penguError:435712890884849664> You're currently not in a voice channel or there was an error, try again.");
        if (queue.length <= 2) return msg.sendMessage("<:penguError:435712890884849664> Your queue has less than two songs, add more to shuffle!");
        await this.shuffleArray(queue);
        return msg.sendMessage("<:penguSuccess:435712876506775553> ***Queue has now been shuffled!***");
    }

    async shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

};
