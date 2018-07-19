const { Command } = require("klasa");

class MusicCommand extends Command {

    constructor(client, store, file, core, { requireMusic = false, ...options }) {
        if ("runIn" in options) options.runIn = ["text"];
        super(client, store, file, core, options);

        this.requireMusic = requireMusic;
    }

}

module.exports = MusicCommand;
