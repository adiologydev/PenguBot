const { PlayerManager } = require("discord.js-lavalink");
const snekfetch = require("snekfetch");
const { Client } = require("discord.js"); // eslint-disable-line no-unused-vars

class LavalinkClient extends PlayerManager {

    /**
     * @param {Client} client the d.js client object
     * @param {Object} options The options and extra data to be used
     */
    constructor(client, options = {}) {
        super(client, options.nodes, options);

        /**
         * An object of region definitions
         * @type {Object}
         */
        this.defaultRegions = options.regions.defaultRegions;

        /**
         * The default region
         * @type {string}
         */
        this.defaultRegion = options.regions.defaultRegion;
    }

    /**
     * Search for tracks from lavalink rest api
     * @param {string} search Search query
     * @returns {Promise<?Array<Object>>}
     */
    resolveTracks(search) {
        return snekfetch.get(`${this.options.rest.url}/loadtracks`)
            .set("Authorization", this.options.rest.password)
            .query({ identifier: search })
            .then(res => res.body ? res.body : null)
            .catch(error => {
                this.client.console.error(error);
                return null;
            });
    }


    /**
     * Finds the ideal host for the given guild region
     * @param {string} region The region of the guild to find the ideal host
     * @returns {Object} the host details for the ideal host
     */
    getIdealHost(region) {
        region = this.getRegion(region);
        const foundNode = this.nodes.find(node => node.ready && node.region === region);
        if (foundNode) return foundNode.host;
        return this.nodes.first().host;
    }

    /**
     * Finds the region to use for the host
     * @param {string} region the region to be mathced
     * @returns {string} returns the region to use for the ideal host
     */
    getRegion(region) {
        region = region.replace("vip-", "");
        for (const key in this.defaultRegions) {
            const nodes = this.nodes.filter(node => node.connected && node.region === key);
            if (!nodes) continue;
            for (const id of this.defaultRegions[key]) {
                if (id === region || region.startsWith(id) || region.includes(id)) return key;
            }
        }
        return this.defaultRegion;
    }

}

module.exports = LavalinkClient;
