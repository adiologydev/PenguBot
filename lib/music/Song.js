const { showSeconds } = require("../Util/Util");

class Song {

    constructor(data, requester) {
        Object.defineProperty(this, "data", { value: data });
        this.requester = requester;
        this.track = data.track;
        this.title = data.info.title;
        this.url = data.info.uri;
        this.id = data.info.identifier;
        this.seekable = data.info.isSeekable;
        this.author = data.info.author;
        this.duration = data.info.isStream ? 0 : data.info.length;
        this.stream = data.info.isStream;
        this.position = data.info.position;
        this.skips = new Set();
    }

    get friendlyDuration() {
        return showSeconds(this.duration);
    }

    toString() {
        return `${this.title} (${this.url})`;
    }

    toJSON() {
        return {
            requester: this.requester ? this.requester.toJSON() : null,
            track: this.track,
            trackTitle: this.title,
            trackURL: this.url,
            trackID: this.id,
            trackDuration: this.duration,
            trackFriendlyDuration: this.friendlyDuration,
            seekable: this.seekable,
            author: this.author,
            stream: this.stream,
            position: this.position
        };
    }

}

module.exports = Song;
