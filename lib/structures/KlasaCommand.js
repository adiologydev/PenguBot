const KlasaCommand = require("klasa").Command;

class Command extends KlasaCommand {

    constructor(client, store, file, core, { upvoteOnly = false, ...options }) {
        super(client, store, file, core, options);
        this.upvoteOnly = upvoteOnly;
    }

}

module.exports = Command;
