const { Command } = require("klasa");

class MusicCommand extends Command {

    constructor(client, store, file, core, { requireMusic = false, ...options }) {
        // By nature, music commands only run in VoiceChannels, which are in Guilds.
        if ("runIn" in options) options.runIn = ["text"];

        super(client, store, file, core, options);

        /**
		 * Whether this command requires an active VoiceConnection or not
		 * @type {boolean}
		 */
        this.requireMusic = requireMusic;
    }

}

module.exports = MusicCommand;
