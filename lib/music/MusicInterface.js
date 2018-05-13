const Song = require("./Song");
const Discord = require("discord.js"); // eslint-disable-line

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
		 * The array of lavalink specified songs
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
        }, { selfdeaf: this.guild.configs.selfDeaf ? this.guild.configs.selfDeaf : true });
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
    smartPlay() {
        if (!this.paused) {
            return this.pause();
        } else if (this.paused) {
            return this.resume();
        }
        return this.pause();
    }

    /**
	 * A skip mathod which has force enabled by default and if it stays that way it will either shop the player or just shift the queue
     * @since 2.0.1
	 * @param {boolean} [force=true] If it should stop the player or just shift the queue
	 * @returns {this}
	 */
    skip(force = true) {
        if (force && this.player) this.player.stop();
        else this.queue.shift();
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
        this.queue = null;
        this.playing = null;
        this.textChannel = null;
        this.volume = null;

        await this.leave();
        this.client.music.delete(this.guild.id);
    }

    toJSON() {
        return {
            textChannel: this.textChannel,
            queue: this.queue,
            playing: this.playing,
            paused: this.paused,
            volume: this.volume
        };
    }

}

module.exports = MusicInterface;
