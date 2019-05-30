const { PlayerManager } = require("discord.js-lavalink");
const { fetch } = require("../util/Util");

class LavalinkClient extends PlayerManager {

    constructor(...args) {
        super(...args);
        this.defaultRegions = {
            asia: ["sydney", "singapore", "japan", "hongkong"],
            eu: ["london", "frankfurt", "amsterdam", "russia", "eu-central", "eu-west"],
            us: ["us-central", "us-west", "us-east", "us-south", "brazil"]
        };
    }

    /**
     * Search for tracks from lavalink rest api
     * @param {string} identifier Search query
     * @returns {Promise<Object>}
     */
    resolveTracks(identifier) {
        const node = this.nodes.first();
        return fetch(`http://${node.host}:${node.port}/loadtracks`, { query: { identifier }, headers: { Authorization: node.password } })
            .catch(error => {
                Error.captureStackTrace(error);
                this.client.emit("error", error);
                return {};
            });
    }

    /**
     * Gets the most ideal region based on specified guild region.
     * @param {string} region The region of the guild
     * @returns {string}
     */
    getIdealRegion(region) {
        region = region.replace("vip-", "");
        for (const key of Object.keys(this.defaultRegions)) {
            const nodes = this.nodes.filter(node => node.ready && node.region === key);
            if (!nodes) continue;
            for (const id of this.defaultRegions[key]) {
                if (region.includes(id)) return key;
            }
        }
        return this.nodes.filter(node => node.ready).first().region;
    }

}

module.exports = LavalinkClient;
