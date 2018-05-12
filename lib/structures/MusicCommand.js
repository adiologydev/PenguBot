const { Command } = require("klasa");

class MusicCommand extends Command {

    constructor(client, store, file, core, options = {}) {
        // By nature, music commands only run in VoiceChannels, which are in Guilds.
        options.runIn = "runIn" in options ? options.runIn : ["text"];

        super(client, store, file, core, options);

        /**
		 * Whether this command requires an active VoiceConnection or not
		 * @type {boolean}
		 */
        this.requireMusic = "requireMusic" in options ? options.requireMusic : true;
    }

}

module.exports = MusicCommand;
