const { PlayerManager } = require("discord.js-lavalink");

class LavaManager extends PlayerManager {

    constructor(client, options = {}) {
        super(client, options.nodes, options);
        this.defaultRegions = options.regions.defaultRegions;
        this.defaultRegion = options.regions.defaultRegion;
    }

    getIdealHost(region) {
        region = this.getRegion(region);
        const foundNode = this.nodes.find(node => node.ready && node.region === region);
        if (foundNode) return foundNode.host;
        return this.client.player.nodes.first().host;
    }

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
