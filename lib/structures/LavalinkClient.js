const snekfetch = require("snekfetch");
const { PlayerManager } = require("discord.js-lavalink");

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
     * @param {Object} node The node to use to query the track
     * @param {string} search Search query
     * @returns {Promise<?Array<Object>>}
     */
    getSongs(node, search) {
        if (!node) node = this.client.lavalink.nodes.first();
        return snekfetch.get(`http://${node.host}:${node.restPort}/loadtracks`)
            .set("Authorization", node.password)
            .query({ identifier: search })
            .then(res => res.body)
            .catch(error => {
                Error.captureStackTrace(error);
                this.client.console.error(error);
                return [];
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

    /**
     * Gets the most ideal host based on specified guild region.
     * @param {string} region The region of the guild
     * @returns {string}
     */
    getIdealHost(region) {
        region = this.getIdealRegion(region);
        const foundNode = this.nodes.find(node => node.ready && node.region === region);
        return foundNode ? foundNode.host : this.nodes.filter(node => node.ready).first().host;
    }

}

module.exports = LavalinkClient;
