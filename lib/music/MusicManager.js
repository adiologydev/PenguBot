const { Collection } = require("discord.js");
const LavalnikClient = require("./LavalinkClient.js");

class MusicManager extends Collection {

    constructor(client, options = {}) {
        super();
        this.client = client;
        this.options = options;

        this.manager = new LavalnikClient(this.client, this.options);
    }

}

module.exports = MusicManager;
