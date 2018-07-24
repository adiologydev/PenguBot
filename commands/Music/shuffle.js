const MusicCommand = require("../../lib/structures/MusicCommand");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireDJ: true,
            requireMusic: true,
            cooldown: 10,
            aliases: ["shufflequeue", "queueshuffle"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: msg => msg.language.get("COMMAND_SHUFFLE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        const { queue } = music;
        if (!music.playing) return msg.sendMessage("<:penguError:435712890884849664> There's currently no music playing!");
        if (queue.length <= 2) return msg.sendMessage("<:penguError:435712890884849664> Your queue has less than two songs, add more to shuffle!");

        await this.shuffleArray(queue);
        return msg.sendMessage("<:penguSuccess:435712876506775553> ***Queue has now been shuffled!***");
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

};
