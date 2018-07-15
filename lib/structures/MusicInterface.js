module.exports = class MusicInterface {

    constructor(guild) {
        Object.defineProperty(this, "client", { value: guild.client });
        Object.defineProperty(this, "guild", { value: guild });

        this.textChannel = null;
        this.queue = [];
        this.playing = false;
        this.paused = false;
    }

    /**
     * Joins the voice channel which the bot will play tracks in
     * @param {VoiceChannel} voiceChannel The voice channel the bot is connected to
     * @returns {string}
     */
    join(voiceChannel) {
        return this.client.lavalink.join({
            guild: this.guild.id,
            channel: voiceChannel.id,
            host: this.client.lavalink.getIdealHost(this.guild.region)
        }, { selfdeaf: true });
    }

    /**
     * Leaves the voice channel the bot is connected to
     * @param {boolean} force Force leave option
     * @returns {MusicInterface}
     */
    async leave(force = true) {
        if (this.player && (this.playing || force)) this.player.stop();
        await this.client.lavalink.leave(this.guild.id);
        this.playing = false;
        return this;
    }

    /**
     * Gets the most ideal region based on specified guild region.
     * @returns {player}
     */
    async play() {
        if (!this.voiceChannel) throw "I couldn't join the Voice Channel, try again!";
        else if (!this.player) throw "No! Something went wrong, try again.";
        else if (!this.queue.length) throw "Can't play songs from an empty queue.";

        const [song] = this.queue;
        this.player.play(song.track);
        this.player.volume(this.volume);
        this.playing = true;
        return this.player;
    }

    /**
     * Pause/Resume the player
     * @returns {MusicInterface}
     */
    pause() {
        if (!this.player) return false;
        this.player.pause(!this.paused);
        this.paused = !this.paused;
        return true;
    }

    /**
     * Skips the current song in the queue
     * @param {boolean} force Force skip option
     * @returns {MusicInterface}
     */
    skip(force = true) {
        if (this.player && force) this.player.stop();
        else this.queue.shift();
        return this;
    }

    /**
     * Clears the current queue
     * @returns {MusicInterface}
     */
    clearQueue() {
        this.queue = [];
        return this;
    }

    /**
     * Destroys the current interface
     * @returns {MusicInterface}
     */
    async destroy() {
        this.queue = [];
        this.playing = false;
        this.paused = false;
        this.textChannel = null;
        this.volume = this.getVolume;

        await this.leave();
        this.client.music.delete(this.guild.id);
    }

    get voiceChannel() {
        return this.guild.me.voiceChannel;
    }

    get player() {
        return this.client.lavalink.get(this.guild.id) || null;
    }

    get volume() {
        return this.guild.configs.musicVolume;
    }

    /**
     * Check if a guild member is listening to music
     * @param {GuildMember} member The member you want to check
     * @returns {boolean}
     */
    isListening(member) {
        return !member.deaf && member.voiceChannel.id === this.voiceChannel.id;
    }

};
