const { Argument, Song, config } = require("../index");

/* eslint-disable no-mixed-operators */

const wcSc = /scsearch:.*/;
const wcYt = /ytsearch:.*/;
const jpop = /(listen.moe|listen moe|listen.moe jpop|listen moe jpop|jpop moe|jpop listen moe|jpop listen.moe|listen.moe\/jpop)/i;
const kpop = /(listen.moe kpop|listen moe kpop|kpop moe|kpop listen moe|kpop listen.moe|listen.moe\/kpop)/i;
const paste = /https:\/\/paste.pengubot.com\/(.*)/i;
const spotifyList = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:playlist\/|user\/spotify\/playlist\/|\?uri=spotify:playlist:)([1-z]{22})/i;
const spotifyUser = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/user\/(\w))/i;
const spotifyAlbum = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:album\/|\?uri=spotify:album:)((\w|-){22})/i;
const spotifyTrack = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/i;

module.exports = class extends Argument {

    /* eslint-disable complexity */
    async run(arg, possible, msg) {
        if (!arg) throw "Please enter a link, word, artist name, song name, etc. to play.";
        arg = arg.replace(/<(.+)>/g, "$1");
        if (!msg.guild) return null;

        const results = [];
        let playlistName = null;

        const isLink = this.isLink(arg);
        if (isLink) {
            if (paste.exec(arg)) {
                const tracks = await this.pasteDump(msg, arg);
                results.push(...tracks);
                results.playlist = "Custom PenguBot Playlist";
            } else if (spotifyList.exec(arg) || spotifyUser.exec(arg)) {
                let argument = arg;
                if (arg.match(/user/i)) argument = arg.replace(/\/user\/(\w)+/, "");
                if (!spotifyList.exec(argument)) throw msg.language.get("ER_MUSIC_NF");
                const data = await get(`https://api.spotify.com/v1/playlists/${spotifyList.exec(argument)[1]}`)
                    .set("Authorization", `Bearer ${this.client.config.keys.music.spotify.token}`);
                if (data.status !== 200 || !data.body) throw msg.language.get("ER_MUSIC_NF");
                for (const trackData of data.body.tracks.items) {
                    const trackRes = await this.getTracks(node, `ytsearch:${trackData.track.artists ? trackData.track.artists[0].name : ""} ${trackData.track.name} audio`);
                    if (!trackRes || !trackRes.tracks) continue;
                    results.push(trackRes.tracks[0]);
                }
                results.playlist = `${data.body.name}`;
            } else if (spotifyAlbum.exec(arg)) {
                const spotifyAlbumResult = await this.spotifyAlbum(msg, arg);

                results.push(...spotifyAlbumResult.tracks);
                playlistName = spotifyAlbumResult.playlist;
            } else if (spotifyTrack.exec(arg)) {
                const spotifyTrackResult = await this.spotifyTrack(msg, arg);
                results.push(spotifyTrackResult);
            } else {
                const httpRes = await this.getTracks(node, arg).catch(() => null);
                if (!httpRes || !httpRes.tracks) throw msg.language.get("ER_MUSIC_NF");
                results.push(httpRes.tracks[0]);
            }
        } else if (wcYt.exec(arg) || wcSc.exec(arg)) {
            const wcSearchRes = await this.getTracks(node, arg).catch(() => null);
            if (!wcSearchRes || !wcSearchRes.tracks) throw msg.language.get("ER_MUSIC_NF");
            results.push(wcSearchRes.tracks[0]);
        } else if (jpop.exec(arg)) {
            const getJpop = await this.getTracks(node, "https://listen.moe/stream").catch(() => null);
            if (!getJpop || !getJpop.tracks) throw msg.language.get("ER_MUSIC_NF");
            results.push(getJpop.tracks[0]);
        } else if (kpop.exec(arg)) {
            const getKpop = await this.getTracks(node, "https://listen.moe/kpop/stream").catch(() => null);
            if (!getKpop || !getKpop.tracks) throw msg.language.get("ER_MUSIC_NF");
            results.push(getKpop.tracks[0]);
        } else {
            let searchRes = await this.getTracks(node, `ytsearch:${arg}`).catch(() => null);
            if (!searchRes || !searchRes.tracks) searchRes = await this.getTracks(node, `scsearch:${arg}`).catch(() => null);
            if (!searchRes || !searchRes.tracks) throw msg.language.get("ER_MUSIC_NF");
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
        return { tracks: results.map(track => new Song(track, msg.author)), playlistName };
    }

    async fetchTracks(search) {
        const result = await this.client.lavalink.resolveTracks(search);

        if (result.loadType === "LOAD_FAILED") throw "There was an error trying to search for that song";

        return { tracks: result.tracks, playlist: "name" in result.playlistInfo ? result.playlistInfo : null };
    }

    async spotifyPlaylist(msg, arg) {
        const data = await this.fetchURL(`https://api.spotify.com/v1/playlists/${spotifyList.exec(arg)[1]}`,
            { headers: { Authorization: `Bearer ${config.keys.music.spotify.token}` } });
        if (!data) throw msg.language.get("ER_MUSIC_NF");

        const tracks = [];

        for (const track of data.tracks.items) {
            const searchResult = await this.fetchTracks(`ytsearch:${track.artists[0].name} ${track.name} audio`);
            if (!searchResult.tracks.length) continue;
            tracks.push(searchResult.tracks[0]);
        }

        return { tracks, playlist: data.name };
    }

    async spotifyTrack(msg, arg) {
        const data = await this.fetchURL(`https://api.spotify.com/v1/tracks/${spotifyTrack.exec(arg)[1]}`,
            { headers: { Authorization: `Bearer ${config.keys.music.spotify.token}` } });
        if (!data) throw msg.language.get("ER_MUSIC_NF");

        const [artist] = data.artists;

        const searchResult = await this.getTracks(`ytsearch:${artist ? artist.name : ""} ${data.name} audio`);
        if (!searchResult.tracks.length) throw msg.language.get("ER_MUSIC_NF");

        return searchResult.tracks[0];
    }

    async spotifyAlbum(msg, arg) {
        const data = await this.fetchURL(`https://api.spotify.com/v1/albums/${spotifyAlbum.exec(arg)[1]}`,
            { headers: { Authorization: `Bearer ${config.keys.music.spotify.token}` } });
        if (!data) throw msg.language.get("ER_MUSIC_NF");

        const tracks = [];

        for (const track of data.tracks.items) {
            const searchResult = await this.fetchTracks(`ytsearch:${track.artists[0].name} ${track.name} audio`);
            if (!searchResult.tracks.length) continue;
            tracks.push(searchResult.tracks[0]);
        }

        return { tracks, playlist: data.name };
    }

    async pasteDump(msg, arg) {
        if (!config.main.patreon) throw msg.language.get("ER_MUSIC_PATRON");
        const tracks = await this.fetchURL(`https://paste.pengubot.com/raw/${paste.exec(arg)[1]}`);
        if (!tracks) throw msg.language.get("ER_MUSIC_NF");
        return tracks;
    }

    isLink(arg) {
        try {
            new URL(arg); // eslint-disable-line no-new
            return true;
        } catch (e) {
            return false;
        }
    }

};
