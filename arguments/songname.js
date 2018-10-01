const { Argument } = require("klasa");
const Song = require("../lib/structures/Song");
const url = require("url");
const { get } = require("snekfetch");

/* eslint-disable no-useless-escape no-mixed-operators */

const playlist = /(\?|\&)list=(.*)/i; 
const soundcloud = /https:\/\/soundcloud\.com\/.*/i;
const scPlaylist = /https:\/\/?soundcloud.com\/.*\/.*\/.*/i;
const wcSc = /scsearch:.*/;
const wcYt = /ytsearch:.*/;
const jpop = /(listen.moe|listen moe|listen.moe jpop|listen moe jpop|jpop moe|jpop listen moe|jpop listen.moe|listen.moe\/jpop)/i;
const kpop = /(listen.moe kpop|listen moe kpop|kpop moe|kpop listen moe|kpop listen.moe|listen.moe\/kpop)/i;
const paste = /https:\/\/paste.pengubot.com\/(.*)/i;

module.exports = class extends Argument {

    /* eslint-disable complexity */
    async run(arg, possible, msg) {
        arg = arg.replace(/<(.+)>/g, "$1");
        if (!msg.guild) return null;

        const results = [];
        results.playlist = null;

        const node = msg.guild.music.idealNode;
        if (!node) throw "Couldn't find an ideal region, please try changing your guild region and try again. If the error presists, contact us at: https://discord.gg/kWMcUNe";

        const isLink = this.isLink(arg);
        if (isLink) {
            if (playlist.exec(arg) || (soundcloud.exec(arg) && scPlaylist.exec(arg))) {
                const playlistResults = await this.getTracks(node, arg);
                if (!playlistResults.tracks[0]) throw msg.language.get("ER_MUSIC_NF");
                results.playlist = playlistResults.playlistInfo.name;
                results.push(...playlistResults.tracks);
            } else if (soundcloud.exec(arg) || wcYt.exec(arg) || wcSc.exec(arg)) {
                const scSingleRes = await this.getTracks(node, arg);
                if (!scSingleRes.tracks) throw msg.language.get("ER_MUSIC_NF");
                results.push(scSingleRes.tracks[0]);
            } else if (paste.exec(arg)) {
                const rawRes = await get(`https://paste.pengubot.com/raw/${paste.exec(arg)[1]}`);
                if (!rawRes.body) throw msg.language.get("ER_MUSIC_NF");
                for (const song of JSON.parse(rawRes.body).songs) {
                    const songRes = await this.getTracks(node, song);
                    results.push(songRes.tracks[0]);
                }
                results.playlist = "Custom PenguBot Playlist";
            } else {
                const httpRes = await this.getTracks(node, arg);
                if (!httpRes.tracks[0]) throw msg.language.get("ER_MUSIC_NF");
                results.push(httpRes.tracks[0]);
            }
        } else if (jpop.exec(arg)) {
            const getJpop = await this.getTracks(node, "https://listen.moe/stream");
            if (!getJpop) throw msg.language.get("ER_MUSIC_NF");
            results.push(getJpop.tracks[0]);
        } else if (kpop.exec(arg)) {
            const getJpop = await this.getTracks(node, "https://listen.moe/kpop/stream");
            if (!getJpop) throw msg.language.get("ER_MUSIC_NF");
            results.push(getJpop.tracks[0]);
        } else {
            let searchRes = await this.getTracks(node, `ytsearch:${arg}`);
            if (!searchRes.tracks[0]) searchRes = await this.getTracks(node, `scsearch:${arg}`);
            if (!searchRes.tracks[0]) throw msg.language.get("ER_MUSIC_NF");
            const options = searchRes.tracks.slice(0, 5);
            const selection = await msg.prompt([`🎵 | **Select a Song - PenguBot**\n`,
                `${options.map((o, index) => `➡ \`${++index}\` ${o.info.title} - ${o.info.author} (${this.client.funcs.friendlyDuration(o.info.length)})`).join("\n")}`,
                `\n${msg.author}, Please select an option by replying from range \`1-5\` to add it to the queue.`], 20000).catch(() => null);
            if (!selection) throw "<:penguError:435712890884849664> ***Invalid Option Selected, please select from `1-5`. Cancelled song selection.***";
            const selectedNo = Number(selection.content);
            if (selectedNo <= 0 || selectedNo > 5 || selectedNo !== Number(selectedNo)) throw "<:penguError:435712890884849664> ***Invalid Option Selected, please select from `1-5`. Cancelled song selection.***";
            results.push(searchRes.tracks[selectedNo - 1]);
        }

        if (!results.length) throw msg.language.get("ER_MUSIC_NF");
        return { tracks: results.filter(a => a && a.track !== undefined).map(track => new Song(track, msg.author)), playlist: results.playlist };
    }

    /**
     * Gets an array of tracks from lavalink REST API
     * @param {Object} node The node to use for REST searches
     * @param {string} search The search string
     * @returns {Array<Object>}
     */
    getTracks(node, search) {
        return this.client.lavalink.getSongs(node, search);
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

};
