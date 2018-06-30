const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 8,
            aliases: ["pause", "resume"],
            permissionLevel: 3,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: msg => msg.language.get("COMMAND_PAUSE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
        this.music = true;
    }

    async run(msg) {
        const player = this.client.lavalink.get(msg.guild.id);
        if (!msg.member.voiceChannel) return msg.sendMessage("<:penguError:435712890884849664> You're currently not in a voice channel.");
        if (!player) return msg.sendMessage("<:penguError:435712890884849664> There's currently no music playing!");

        if (!this.client.config.main.patreon || !this.client.functions.isPatron(msg.guild) || !await this.client.functions.isUpvoter(msg.author.id)) return msg.sendMessage("<:penguError:435712890884849664> ***You need to be an upvoter of PenguBot to use this command by voting at: <https://discordbots.org/bot/PenguBot> or by being in a Patron Guild by becoming a Patron at <https://www.patreon.com/PenguBot>.***");

        if (player.paused) {
            player.pause(false);
            return msg.sendMessage("⏯ | ***PenguBot has Resumed the music!***");
        } else {
            player.pause(true);
            return msg.sendMessage("⏯ | ***PenguBot has Paused the music!***");
        }
    }

};
