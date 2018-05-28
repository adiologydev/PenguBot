const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
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
        const queue = this.client.queue.get(msg.guild.id);
        if (!msg.member.voiceChannel) return msg.sendMessage("<:penguError:435712890884849664> You're currently not in a voice channel.");
        if (!queue) return msg.sendMessage("<:penguError:435712890884849664> There's currently no music playing!");
        if (queue.songs.length <= 2) return msg.sendMessage("<:penguError:435712890884849664> Your queue has less than two songs, add more to shuffle!");
        await this.shuffleArray(queue.songs);
        return msg.sendMessage("<:penguSuccess:435712876506775553> ***Queue has now been shuffled!***");
    }

    async shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

};
