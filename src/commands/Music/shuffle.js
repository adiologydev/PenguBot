const MusicCommand = require("../../lib/structures/MusicCommand");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireDJ: true,
            requireMusic: true,
            cooldown: 10,
            aliases: ["shufflequeue", "queueshuffle"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_SHUFFLE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        if (!music.playing) return msg.sendMessage(msg.language.get("MUSIC_NOT_PLAYING"));
        if (music.queue.length <= 2) return msg.sendMessage(`${this.client.emotes.cross} Your queue has less than two songs, add more to shuffle!`);

        this.shuffleArray(music.queue);
        return msg.sendMessage(`${this.client.emotes.check} ***Queue has now been shuffled!***`);
    }

    shuffleArray(array) {
        const [first] = array;
        array.shift();
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        array.unshift(first);
    }

};
