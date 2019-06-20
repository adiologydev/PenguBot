const Command = require("./KlasaCommand");

class MusicCommand extends Command {

    constructor(client, store, file, core, { requireMusic = false, requireDJ = false, ...options }) {
        options.runIn = ["text"];
        super(client, store, file, core, options);

        this.requireMusic = requireMusic;
        this.requireDJ = requireDJ;
    }

}

module.exports = MusicCommand;
