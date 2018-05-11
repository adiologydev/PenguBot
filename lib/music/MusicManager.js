const { Collection } = require("discord.js");
const LavaManager = require("./LavaManager.js");

class MusicManager extends Collection {

    constructor(client, options = {}) {
        super();
        this.client = client;
        this.options = options;

        this.manager = new LavaManager(this.client, this.options);
    }

}

module.exports = MusicManager;
