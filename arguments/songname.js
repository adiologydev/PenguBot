const { Argument } = require("klasa");
const Song = require("../lib/structures/Song");
const url = require("url");

const playlist = /(\?|\&)list=(.*)/i; // eslint-disable-line no-useless-escape
const soundcloud = /https:\/\/soundcloud\.com\/.*/i;
const scPlaylist = /https:\/\/?soundcloud.com\/.*\/.*\/.*/i;
const wcSc = /scsearch:.*/;
const wcYt = /ytsearch:.*/;

module.exports = class extends Argument {

    /* eslint-disable complexity */
    async run(arg, possible, msg) {
        arg = arg.replace(/<(.+)>/g, "$1");
        if (!msg.guild) return null;

        const results = [];
        results.playlist = null;

        const node = this.idealNode(msg.guild.region);
        if (!node) throw "Couldn't find an ideal region, please try changing your guild region and try again. If the error presists, contact us at: https://discord.gg/kWMcUNe";

        const isLink = this.isLink(arg);
        if (isLink) {
            if (playlist.exec(arg)) {
                const playlistResults = await this.getTracks(arg, node);
                if (!playlistResults.tracks[0]) throw msg.language.get("ER_MUSIC_NF");
                results.playlist = playlistResults.playlistInfo.name;
                results.push(...playlistResults.tracks);
            } else if (soundcloud.exec(arg)) {
                if (scPlaylist.exec(arg)) {
                    const scPlaylistRes = await this.getTracks(arg, node);
                    if (!scPlaylistRes.tracks[0]) throw msg.language.get("ER_MUSIC_NF");
                    results.playlist = scPlaylistRes.playlistInfo.name;
                    results.push(...scPlaylistRes.tracks);
                } else {
                    const scSingleRes = await this.getTracks(arg, node);
                    if (!scSingleRes.tracks) throw msg.language.get("ER_MUSIC_NF");
                    results.push(scSingleRes.tracks[0]);
                }
            } else {
                const httpRes = await this.getTracks(arg, node);
                if (!httpRes.tracks[0]) throw msg.language.get("ER_MUSIC_NF");
                results.push(httpRes.tracks[0]);
            }
        } else if (wcYt.exec(arg) || wcSc.exec(arg)) {
            const wildcardRes = await this.getTracks(arg, node);
            if (!wildcardRes.tracks[0]) throw msg.language.get("ER_MUSIC_NF");
            results.push(wildcardRes.tracks[0]);
        } else {
            let searchRes = await this.getTracks(`ytsearch:${arg}`, node);
            if (!searchRes.tracks[0]) searchRes = await this.getTracks(`scsearch:${arg}`, node);
            if (!searchRes.tracks[0]) throw msg.language.get("ER_MUSIC_NF");
            const options = searchRes.tracks.slice(0, 5);
            const selection = await msg.awaitReply([`🎵 | **Select a Song - PenguBot**\n`,
                `${options.map((o, index) => `➡ \`${++index}\` ${o.info.title} - ${o.info.author} (${this.client.functions.friendlyDuration(o.info.length)})`).join("\n")}`,
                `\n${msg.author}, Please select an option by replying from range \`1-5\` to add it to the queue.`], 20000).catch(() => null);
            if (!selection) throw "<:penguError:435712890884849664> ***Invalid Option Selected, please select from `1-5`. Cancelled song selection.***";
            const selectedNo = Number(selection);
            if (selectedNo <= 0 || selectedNo > 5 || selectedNo !== Number(selectedNo)) throw "<:penguError:435712890884849664> ***Invalid Option Selected, please select from `1-5`. Cancelled song selection.***";
            results.push(searchRes.tracks[selectedNo - 1]);
        }

        if (!results.length) throw msg.language.get("ER_MUSIC_NF");
        return { tracks: results.map(track => new Song(track, msg.author)), playlist: results.playlist };
    }

    /**
     * Gets an array of tracks from lavalink REST API
     * @param {string} search The search string
     * @param {Object} node The node to use for REST searches
     * @returns {Array<Object>}
     */
    getTracks(search, node) {
        return this.client.lavalink.getSongs(search, node);
    }

    /**
     * Returns a valid URl that can be accepted by Lavalink
     * @param {string} arg URL which you want to verify
     * @returns {string}
     */
    isLink(arg) {
        const res = url.parse(arg);
        const goodUrl = res.protocol && res.hostname;
        return goodUrl && (res.protocol === "https:" || res.protocol === "http:");
    }

    /**
     * Gets the ideal Node based on the guild region
     * @param {string} region Region of a Guild
     * @returns {LavalinkNode}
     */
    idealNode(region) {
        return this.client.lavalink.nodes.get(this.client.lavalink.getIdealHost(region)) || null;
    }

};
