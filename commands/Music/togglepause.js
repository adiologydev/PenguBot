const MusicCommand = require("../../lib/structures/MusicCommand");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireDJ: true,
            requireMusic: true,
            cooldown: 8,
            aliases: ["pause", "resume"],
            permissionLevel: 3,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_PAUSE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        if (!music.playing) return msg.sendMessage("<:penguError:435712890884849664> There's currently no music playing!");
        if (!this.client.config.main.patreon && !this.client.funcs.isPatron(msg.guild) && !await this.client.funcs.isUpvoter(msg.author)) return msg.sendMessage("<:penguError:435712890884849664> ***You need to be an upvoter of PenguBot to use this command by voting at: <https://discordbots.org/bot/PenguBot> or by being in a Patron Guild by becoming a Patron at <https://www.patreon.com/PenguBot>.***");

        music.pause();
        return msg.sendMessage(`⏯ | ***PenguBot has ${music.paused ? "Paused" : "Resumed"} the music!***`);
    }

};
