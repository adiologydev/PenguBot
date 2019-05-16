const { Argument, Song, config } = require("../index");

const wildcard = /(?:scsearch:|ytsearch:).*/i;
const paste = /https:\/\/paste.pengubot.com\/(.*)/i;
const ytPlaylist = /(\?|&)list=(.*)/i;
const scPlaylist = /https:\/\/?soundcloud.com\/.*\/.*\/.*/i;
const spotifyList = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:playlist\/|user\/spotify\/playlist\/|\?uri=spotify:playlist:)([1-z]{22})/i;
const spotifyAlbum = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:album\/|\?uri=spotify:album:)((\w|-){22})/i;
const spotifyTrack = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/i;

module.exports = class extends Argument {

    async run(arg, possible, msg) {
        if (!arg) throw `${this.client.emotes.cross} ***Please enter a link, word, artist name, song name, etc. to play.***`;
        arg = arg.replace(/<(.+)>/g, "$1");
        if (!msg.guild) return null;

        const validLink = this.isLink(arg);
        if (validLink) {
            if (paste.exec(arg)) return this.pasteDump(msg, arg);
            if (ytPlaylist.exec(arg) || scPlaylist.exec(arg)) return this.handlePlaylist(msg, arg);
            if (spotifyTrack.exec(arg)) return this.spotifyTrack(msg, arg);
            if (spotifyList.exec(arg)) return this.spotifyPlaylist(msg, arg);
            if (spotifyAlbum.exec(arg)) return this.spotifyAlbum(msg, arg);
            else return this.httpTrack(msg, arg);
        }

        if (wildcard.exec(arg)) return this.wildcardTrack(msg, arg);
        else return this.searchTrack(msg, arg);
    }

    async searchTrack(msg, arg) {
        let data = await this.fetchTracks(`ytsearch:${arg}`);
        if (!data || !data.tracks.length) data = await this.fetchTracks(`scsearch:${arg}`);
        if (!data || !data.tracks.length) throw msg.language.get("ER_MUSIC_NF");

        const options = data.tracks.slice(0, 5);
        const selection = await msg.prompt([`🎵 | **Select a Song - PenguBot**\n`,
            `${options.map((o, index) => `➡ \`${++index}\` ${o.info.title} - ${o.info.author} (${this.client.funcs.friendlyDuration(o.info.length)})`).join("\n")}`,
            `\n${msg.author}, Please select a track by replying from range \`1-5\` to add it to the queue.`].join("\n"), 20000).catch(() => null);

        if (!selection) throw `${this.client.emotes.cross} ***Invalid Option Selected, please select one number between \`1-5\`. Cancelled song selection.***`;
        if (!options[selection]) throw `${this.client.emotes.cross} ***Specified track could not be found, please try again with a different one.***`;
        return { tracks: new Song(options[selection], msg.author) };
    }

    async httpTrack(msg, arg) {
        const data = await this.fetchTracks(arg);
        if (!data || !data.tracks.length) throw msg.language.get("ER_MUSIC_NF");

        return { tracks: new Song(data.tracks[0], msg.author) };
    }

    async wildcardTrack(msg, arg) {
        const data = await this.fetchTracks(wildcard.exec(arg)[0]);
        if (!data || !data.tracks.length) throw msg.language.get("ER_MUSIC_NF");

        return { tracks: new Song(data.tracks[0], msg.author) };
    }

    async handlePlaylist(msg, arg) {
        const data = await this.fetchTracks(arg);
        if (!data || !data.tracks.length) throw msg.language.get("ER_MUSIC_NF");

        return { tracks: data.tracks.map(track => new Song(track, msg.author)), playlist: data.playlist.name };
    }

    async spotifyPlaylist(msg, arg) {
        const data = await this.fetchURL(`https://api.spotify.com/v1/playlists/${spotifyList.exec(arg)[1]}`,
            { headers: { Authorization: `Bearer ${config.keys.music.spotify.token}` } });
        if (!data) throw msg.language.get("ER_MUSIC_NF");

        const loading = await msg.sendMessage(`${this.client.emotes.loading} ***Spotify Playlist is Loading...***`);
        const tracks = [];

        for (const { track } of data.tracks.items) {
            const searchResult = await this.fetchTracks(`ytsearch:${track.album.artists[0].name || track.artists[0].name} ${track.name} audio`);
            if (!searchResult.tracks.length) continue;
            tracks.push(new Song(searchResult.tracks[0], msg.author));
        }

        await loading.delete().catch(() => null);
        return { tracks, playlist: data.name };
    }

    async spotifyTrack(msg, arg) {
        const data = await this.fetchURL(`https://api.spotify.com/v1/tracks/${spotifyTrack.exec(arg)[1]}`,
            { headers: { Authorization: `Bearer ${config.keys.music.spotify.token}` } });
        if (!data) throw msg.language.get("ER_MUSIC_NF");

        const [artist] = data.artists;

        console.log(data);

        const searchResult = await this.fetchTracks(`ytsearch:${artist ? artist.name : ""} ${data.name} audio`);
        if (!searchResult.tracks.length) throw msg.language.get("ER_MUSIC_NF");

        return { tracks: new Song(searchResult.tracks[0], msg.author) };
    }

    async spotifyAlbum(msg, arg) {
        const data = await this.fetchURL(`https://api.spotify.com/v1/albums/${spotifyAlbum.exec(arg)[1]}`,
            { headers: { Authorization: `Bearer ${config.keys.music.spotify.token}` } });
        if (!data) throw msg.language.get("ER_MUSIC_NF");

        const loading = await msg.sendMessage(`${this.client.emotes.loading} ***Spotify Album is Loading...***`);
        const tracks = [];

        for (const track of data.tracks.items) {
            const searchResult = await this.fetchTracks(`ytsearch:${track.artists[0].name} ${track.name} audio`);
            if (!searchResult.tracks.length) continue;
            tracks.push(new Song(searchResult.tracks[0], msg.author));
        }

        await loading.delete().catch(() => null);
        return { tracks, playlist: data.name };
    }

    async pasteDump(msg, arg) {
        if (!config.main.patreon) throw msg.language.get("ER_MUSIC_PATRON");
        const tracks = await this.fetchURL(`https://paste.pengubot.com/raw/${paste.exec(arg)[1]}`);
        if (!tracks) throw msg.language.get("ER_MUSIC_NF");

        return { tracks };
    }

    async fetchTracks(search) {
        const result = await this.client.lavalink.resolveTracks(search);

        if (result.loadType === "LOAD_FAILED") throw "There was an error trying to search for that song";
        return { tracks: result.tracks, playlist: "name" in result.playlistInfo ? result.playlistInfo : null };
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
