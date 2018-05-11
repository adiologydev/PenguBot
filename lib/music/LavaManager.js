const { PlayerManager } = require("discord.js-lavalink");

class LavaManager extends PlayerManager {

    /**
     * @param {Object} client the d.js client object
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

module.exports = LavaManager;
