const { Command } = require("klasa");

class MusicCommand extends Command {

    constructor(client, store, file, core, options = {}) {
        super(client, store, file, core, options);

        this.runIn = options.runIn = "runIn" in options ? options.runIn : ["text"];

        /**
		 * Whether this command requires an active VoiceConnection or not
         * @since 2.0.1
		 * @type {boolean}
		 */
        this.requireMusic = "requireMusic" in options ? options.requireMusic : true;
    }

}

module.exports = MusicCommand;
