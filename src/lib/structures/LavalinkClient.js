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

    async _attemptConnection(guildId) {
        const server = this.voiceServers.get(guildId);
        const state = this.voiceStates.get(guildId);

        if (!server) return false;

        const guild = this.client.guilds.get(guildId);
        if (!guild) return false;
        const player = this.players.get(guildId);
        if (!player) return false;

        await player.connect({ sessionId: state ? state.session_id : player.voiceUpdateState.sessionId, event: server });
        return true;
    }

    sendWS(data) {
        const guild = this.client.guilds.get(data.d.guild_id);
        if (!guild) return;
        return guild.shard.send(data);
    }

}

module.exports = LavalinkClient;
