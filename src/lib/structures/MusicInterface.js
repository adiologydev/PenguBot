const { config } = require("../../index");

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

    join(voiceChannel) {
        return this.client.lavalink.join({
            guild: this.guild.id,
            channel: voiceChannel.id,
            host: this.idealNode.host
        }, { selfdeaf: true });
    }

    async leave(force = true) {
        if (this.player && (this.playing || force)) this.player.stop();
        await this.client.lavalink.leave(this.guild.id);
        this.playing = false;
        return this;
    }

    async play() {
        if (!this.player) throw "No! Something went wrong, try again.";
        else if (!this.queue.length) throw "Can't play songs from an empty queue.";

        const [song] = this.queue;
        const volume = config.patreon ? { volume: this.guild.settings.get("misc.volume") } : {};

        await this.player.play(song.track, volume);

        this.playing = true;
        return this.player;
    }

    async pause(pause = true) {
        if (!this.player) return null;
        await this.player.pause(pause);
        this.paused = pause;
        return this.paused;
    }

    resume() {
        return this.pause(false);
    }

    async skip(force = true) {
        if (this.player && force) await this.player.stop();
        else this.queue.shift();
        return this;
    }

    clearQueue() {
        this.queue = [];
        return this;
    }

    async destroy() {
        this.queue = null;
        this.playing = null;
        this.paused = null;
        this.textChannel = null;
        this.looping = null;

        if (this.player) await this.player.destroy();
        await this.leave();
        this.client.music.delete(this.guild.id);
    }

    get voiceChannel() {
        return this.guild.me ? this.guild.me.voice.channel : null;
    }

    get player() {
        return this.client.lavalink.players.get(this.guild.id) || null;
    }

    get idealNode() {
        return this.client.lavalink.idealNodes.first();
    }

}

module.exports = MusicInterface;
