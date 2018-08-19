/**
 * Used for easy access to infomation about a lavalink track.
 */
class Song {

    /**
     * @typedef {Object} LavalinkTrack
     * @property {string} track Base64 track string from Lavalink REST API
     * @property {LavalinkTrackInfo} info A bunch of info relating to the track
     */

    /**
      * @typedef {Object} LavalinkTrackInfo
      * @property {string} identifier The track identifier depending on the source
      * @property {boolean} isSeekable Whether the track is seekable or not
      * @property {string} author Author of the track
      * @property {number} length length aka duration of the track
      * @property {boolean} isStream Whether the track is a stream or not
      * @property {number} position Position of the track to start at
      * @property {string} title Title of the track
      * @property {string} uri Url of the track
      */

    /**
     * @typedef {Object} SongInfo
     * @property {string} track Base64 track string from Lavalink REST API
     * @property {string} title Song title
     * @property {string} url Song URL
     * @property {string} id Song id
     * @property {boolean} seekable Whether the song is seekable or not
     * @property {string} author Author of the song
     * @property {number} duration Length of the song
     * @property {string} friendlyDuration Friendly format of the song duration
     * @property {boolean} stream Whether the song is a stream or not
     * @property {number} position Position of the song to start at
     */

    /**
     * @param {LavalinkTrack} data Track data from Lavalink
     * @param {User} requester Person who requested the track
     */
    constructor(data, requester) {
        /**
         * The member who requested the song
         * @type {User}
         */
        this.requester = requester;
        /**
         * Base64 track string from Lavalink REST API
         * @type {string}
         */
        this.track = data.track;
        /**
         * Song title
         * @type {string}
         */
        this.title = data.info.title;
        /**
         * Song url
         * @type {string}
         */
        this.url = data.info.uri;
        /**
         * Song id
         * @type {string}
         */
        this.id = data.info.identifier;
        /**
         * Whether the song is seekable or not
         * @type {boolean}
         */
        this.seekable = data.info.isSeekable;
        /**
         * Song channel name
         * @type {string}
         */
        this.author = data.info.author;
        /**
         * Song length aka duration
         * @type {number}
         */
        this.duration = data.info.isStream ? 0 : data.info.length;
        /**
         * Whether the song is a stream or not
         * @type {boolean}
         */
        this.stream = data.info.isStream;
        /**
         * The position the song will start at
         * @type {number}
         */
        this.position = data.info.position;
        /**
         * The amount of skips for the song
         * @type {Set}
         */
        this.skips = new Set();
    }

    /**
     * Friendly format of the song duration
     * @type {string}
     * @readonly
     */
    get friendlyDuration() {
        const sec = Math.floor((this.duration / 1000) % 60).toString();
        const min = Math.floor((this.duration / (1000 * 60)) % 60).toString();
        const hrs = Math.floor(this.duration / (1000 * 60 * 60)).toString();
        return this.stream ? "Live Stream" : `${hrs.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
    }

}

module.exports = Song;
