class MusicInterface {

    constructor(guild) {
        Object.defineProperty(this, "client", { value: guild.client });
        Object.defineProperty(this, "guild", { value: guild });

        this.textChannel = null;
        this.queue = [];
        this.playing = false;
        this.paused = false;
        this.looping = false;
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
            host: this.idealNode.host
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
     * @returns {Player}
     */
    async play() {
        if (!this.player) throw "No! Something went wrong, try again.";
        else if (!this.queue.length) throw "Can't play songs from an empty queue.";

        const [song] = this.queue;
        this.player.play(song.track);
        this.player.volume(this.volume);
        this.playing = true;
        return this.player;
    }

    /**
     * Pause/Resume the player
     * @returns {boolean}
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
     * @returns {void}
     */
    async destroy() {
        this.queue = null;
        this.playing = null;
        this.paused = null;
        this.textChannel = null;
        this.looping = null;

        if (this.player) this.player.destroy();
        await this.leave();
        this.client.music.delete(this.guild.id);
    }

    get voiceChannel() {
        return this.guild.me.voice.channel;
    }

    get player() {
        return this.client.lavalink.get(this.guild.id) || null;
    }

    get volume() {
        return this.guild.settings.musicVolume;
    }

    /**
     * Gets the ideal Node based on the load
     * @returns {LavalinkNode}
     */
    get idealNode() {
        const nodes = this.client.lavalink.nodes.filter(node => node.ready);
        const selectedNode = nodes.sort((a, b) => {
            const aload = a.stats.cpu ? (a.stats.cpu.systemLoad / a.stats.cpu.cores) * 100 : 0;
            const bload = b.stats.cpu ? (b.stats.cpu.systemLoad / b.stats.cpu.cores) * 100 : 0;
            return aload - bload;
        }).first();
        return selectedNode || nodes.first();
    }

    /**
     * Check if a guild member is listening to music
     * @param {GuildMember} member The member you want to check
     * @returns {boolean}
     */
    isListening(member) {
        return !member.voice.deaf && member.voice.channel.id === this.voice.channel.id;
    }

}

module.exports = MusicInterface;
