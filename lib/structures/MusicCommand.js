const Command = require("../../lib/structures/KlasaCommand");

class MusicCommand extends Command {

    constructor(client, store, file, core, { requireMusic = false, requireDJ = false, upvoteOnly = false, ...options }) {
        options.runIn = ["text"];
        super(client, store, file, core, options);

        this.requireMusic = requireMusic;
        this.requireDJ = requireDJ;
        this.upvoteOnly = upvoteOnly;
    }

}

module.exports = MusicCommand;
