const { Argument } = require("klasa");
const url = require("url");

module.exports = class extends Argument {

    async run(arg, possible, msg) {
        arg = arg.replace(/<(.+)>/g, "$1");
        if (!msg.guild) return null;
        const results = [];
        results.isPlaylist = false;
        if (this.isLink(arg)) {
            const linkResults = await this.client.lavalink.resolveTracks(arg);
            if (!linkResults) return null;
            for (const result of linkResults) if (result.track) results.push(result);
        } else {
            const searchResults = await this.client.lavalink.resolveTracks(`ytsearch: ${arg}`);
            if (!searchResults) return null;
            if (searchResults[0].track) results.push(searchResults[0]);
        }

        if (!results.length) {
            const searchResults = await this.client.lavalink.resolveTracks(`scsearch: ${arg}`);
            if (!searchResults) return null;
            if (searchResults[0].track) results.push(searchResults[0]);
        }

        if (results.length > 1) results.isPlaylist = true;

        if (!results.length) throw `Could not find any results for \`${arg}\``;
        return results;
    }

    isLink(arg) {
        const res = url.parse(arg);
        return res.protocol && res.hostname;
    }

};
