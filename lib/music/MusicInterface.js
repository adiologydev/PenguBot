const Song = require("./Song");
const Discord = require("discord.js"); // eslint-disable-line
const { lyricsRequest, lyricsFormatter } = require("../Util/Util");

class MusicInterface {

    /**
	 * @param {Discord.Guild} guild The guild object of the guild where this is goin to be called
	 */
    constructor(guild) {
        /**
		 * The actual guild client object
         * @since 2.0.1
		 * @type {Discord.Client}
		 * @private
		 */
        Object.defineProperty(this, "client", { value: guild.client });
        /**
		 * The actual guild object
         * @since 2.0.1
		 * @type {Discord.Guild}
		 * @private
		 */
        Object.defineProperty(this, "guild", { value: guild });

        /**
		 * The actual guild client object
         * @since 2.0.1
		 * @type {Discord.Channel}
		 * @private
		 */
        this.textChannel = null;
        /**
		 * The array of lavalink specified songs
         * @since 2.0.1
		 * @type {Array<Song>}
		 */
        this.queue = [];
        /**
		 * The boolean to display if the client is currently playing
         * @since 2.0.1
		 * @type {Boolean}
		 */
        this.playing = false;
        /**
		 * The option to pause the music
         * @since 2.0.1
		 * @type {Boolean}
		 */
        this.paused = false;
        /**
		 * The array of lavalink specified songs
         * @since 2.0.1
		 * @type {number}
		 */
        this.volume = guild.configs.musicVolume;
        /**
		 * The option to autoloop the song
         * @since 2.0.1
		 * @type {Boolean}
		 */
        this.loop = false;
    }

    /**
	 * The method to add a LavalinkTrack to the queue
     * @since 2.0.1
	 * @param {LavalinkTrack} songdata The LavalinkTrack data to be added and formated for the queue to handle
	 * @param {Discord.GuildMember} requester The person who requested the addition of this song
	 * @returns {Song}
	 */
    add(songdata, requester) {
        const song = new Song(songdata, requester);
        this.queue.push(song);
        return song;
    }

    /**
	 * Makes the bot join a given voice channel with the optimal region and into the specified voiceChannel
     * @since 2.0.1
	 * @param {Discord.voiceChannel} voiceChannel The voice channel the player should join
	 * @returns {Object<Player>}
	 */
    join(voiceChannel) {
        return this.client.lavalink.join({
            guild: this.guild.id,
            channel: voiceChannel.id,
            host: this.client.lavalink.getIdealHost(this.guild.region)
        }, { selfdeaf: true });
    }

    /**
	 * Makes the bot leave the voiceChannel it is currently in and set the playing status to false
     * @since 2.0.1
	 * @param {boolean} [force=true] If the bot should force leave the curreny channel
	 * @returns {this}
	 */
    async leave(force = true) {
        if (this.playing || this.player || force) this.player.stop();
        await this.client.lavalink.leave(this.guild.id);
        this.playing = false;
        return this;
    }

    /**
	 * Starts the player and checks if all criteria is met otherwise it will throw the warning but if it works it will start the player
     * @since 2.0.1
	 * @returns {Player}
	 */
    async play() {
        const check = !this.voiceChannel ? "Well, Well, Well, It seems theres no where to play the sick tunes" : !this.player ? "Well it seems I cant find the cable for my 🎧" : this.queue.length === 0 ? "I have no records to play so please provide some" : null;
        if (check) throw check;

        const song = this.queue[0];
        this.player.play(song.track);
        this.playing = true;
        return this.player;
    }

    /**
	 * Pauses the player and returns this
     * @since 2.0.1
	 * @returns {this}
	 */
    pause() {
        if (!this.player) return null;
        this.player.pause();
        this.paused = true;
        return this;
    }

    /**
	 * Resumes the player and returns this
     * @since 2.0.1
	 * @returns {this}
	 */
    resume() {
        if (!this.player) return null;
        this.player.resume();
        this.paused = false;
        return this;
    }

    /**
	 * Depending on the current state it will either pause or resume
     * @since 2.0.1
	 * @returns {this}
	 */
    smartPause() {
        if (!this.paused) {
            return this.pause();
        } else if (this.paused) {
            return this.resume();
        }
        return this.pause();
    }

    /**
	 * Turns autoloop off
     * @since 2.0.1
	 * @returns {this}
	 */
    loopOff() {
        if (!this.player) return null;
        this.loop = false;
        return this;
    }

    /**
	 * Turns autoloop on
     * @since 2.0.1
	 * @returns {this}
	 */
    loopOn() {
        if (!this.player) return null;
        this.loop = true;
        return this;
    }

    /**
	 * Depending on the current state it will either turn autoloop on or off
     * @since 2.0.1
	 * @returns {this}
	 */
    smartLoop() {
        if (!this.loop) {
            return this.loopOn();
        } else if (this.loop) {
            return this.loopOff();
        }
        return this.loopOn();
    }

    async lyrics(c = true, query = null) {
        if (c === true) {
            if (this.queue.length === 0) throw "No song in Queue!";
            const current = this.queue[0];
            const req = await lyricsRequest(`search?q=${current.title}`);
            return await lyricsFormatter(req);
        } else if (c !== true) {
            if (!query) throw "A query must be provided if in non current mode.";
            const req = await lyricsRequest(`search?q=${query}`);
            return await lyricsFormatter(req);
        }
    }

    /**
	 * A skip mathod which has force enabled by default and if it stays that way it will either shop the player or just shift the queue
     * @since 2.0.1
	 * @returns {this}
	 */
    skip() {
        this.queue.shift();
        this.play(this.queue[0]);
        return this;
    }

    /**
	 * Clears the whole queue
     * @since 2.0.1
	 * @returns {this}
	 */
    prune() {
        this.queue = [];
        return this;
    }

    /**
	 * Destroys the whole MusicInterface by setting everything to null
     * @since 2.0.1
	 */
    async destroy() {
        this.queue = [];
        this.playing = null;
        this.textChannel = null;

        await this.leave();
        this.client.music.delete(this.guild.id);
    }

    /**
	 * Returns the guilds voice channel
     * @since 2.0.1
	 * @returns {Discord.voiceChannel}
	 * @readonly
	 */
    get voiceChannel() {
        return this.guild.me.voiceChannel;
    }

    /**
	 * Returns the guilds current player
     * @since 2.0.1
	 * @returns {Object<Player>}
	 * @readonly
	 */
    get player() {
        return this.client.lavalink.get(this.guild.id) || null;
    }

}

module.exports = MusicInterface;
