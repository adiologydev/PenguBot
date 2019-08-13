const { Command: KlasaCommand } = require("klasa");

class Command extends KlasaCommand {

    constructor(store, file, core, { upvoteOnly = false, patronOnly = false, ...options }) {
        super(store, file, core, options);
        this.upvoteOnly = upvoteOnly;
        this.patronOnly = patronOnly;
    }

}

module.exports = Command;
