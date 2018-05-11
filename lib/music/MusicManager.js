const { Collection, Client } = require("discord.js"); // eslint-disable-line no-unused-vars
const LavalinkClient = require("./LavalinkClient.js");

class MusicManager extends Collection {

    /**
     * @param {Client} client the d.js client object
     * @param {Object} options The options and extra data to be used
     */
    constructor(client, options = {}) {
        super();
        this.client = client;
        this.options = options;

        this.manager = new LavalinkClient(this.client, this.options);
    }

}

module.exports = MusicManager;
