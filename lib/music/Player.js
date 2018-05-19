const { Player } = require("discord.js-lavalink");

class LavalinkPlayer extends Player {

    constructor(...args) {
        super(...args);

        this.on("error", this.client.console.error);
    }

}

module.exports = LavalinkPlayer;
