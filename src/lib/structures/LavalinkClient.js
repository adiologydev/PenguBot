const { PlayerManager } = require("discord.js-lavalink");
const { fetch } = require("../util/Util");

class LavalinkClient extends PlayerManager {

    constructor(...args) {
        super(...args);

        this.on("disconnect", (node, event) => this.client.console.log(`${node.host} has disconnected. Reason: ${event.reason || "No reason provided."} | Code: ${event.code} | Clean: ${event.wasClean}`));
        this.on("error", (node, error) => this.client.emit(error));
    }

    resolveTracks(identifier) {
        const node = this.nodes.first();
        return fetch(`http://${node.host}:${node.port}/loadtracks`, { query: { identifier }, headers: { Authorization: node.password } })
            .catch(error => {
                Error.captureStackTrace(error);
                this.client.emit("error", error);
                throw error;
            });
    }

}

module.exports = LavalinkClient;
