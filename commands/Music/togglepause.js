const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 8,
            aliases: ["pause", "resume"],
            permLevel: 3,
            botPerms: ["USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_PAUSE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const player = this.client.lavalink.get(msg.guild.id);
        if (!msg.member.voiceChannel) return msg.channel.send("<:penguError:435712890884849664> You're currently not in a voice channel.");
        if (!player) return msg.channel.send("<:penguError:435712890884849664> There's currently no music playing!");
        if (player.paused) {
            player.pause(false);
            return msg.channel.send("⏯ | ***PenguBot has Resumed the music!***");
        } else {
            player.pause(true);
            return msg.channel.send("⏯ | ***PenguBot has Paused the music!***");
        }
    }

};
