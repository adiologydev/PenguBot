const Song = require("../../lib/music/Song.js"); // eslint-disable-line
const Discord = require("discord.js");

const { Command } = require("klasa");
const { MessageEmbed } = Discord;

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 8,
            permissionLevel: 0,
            aliases: ["musicplay"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS", "ATTACH_FILES"],
            description: (msg) => msg.language.get("COMMAND_PLAY_DESCRIPTION"),
            usage: "<song:string>",
            extendedHelp: "No extended help available."
        });

        /**
         * A function to delay code execution
         * @param {number} time The amount of time to delay for
         * @returns {Promise<setTimeout>}
         */
        this.delayer = time => new Promise(res => setTimeout(() => res(), time));
        this.Music = true;
    }

    async run(msg, [song]) {
        const { voiceChannel } = msg.member;
        this.resolvePermissions(msg, voiceChannel);
        const music = msg.guild.music();
        music.textChannel = msg.channel;

        const songs = await this.client.lavalink.resolveTracks(song);
        return this.handle(msg, songs, music);
    }

    async handle(msg, songs, musicInterface) {
        if (!musicInterface.playing) await this.handleSongs(msg, songs, true, musicInterface);
        if (musicInterface.playing) return this.handleSongs(msg, songs, false, musicInterface);

        try {
            await musicInterface.join(msg.member.voiceChannel);
            return this.play(musicInterface);
        } catch (error) {
            this.client.console.error(error);
            return musicInterface.textChannel.send(`Voice Channel Error: ${error}`).then(() => musicInterface.destroy());
        }
    }

    async handleSongs(msg, songs, first = false) {
        if (songs.isPlaylist) {
            for (const song of songs) msg.guild.music().add(song, msg.member);
            if (first === false) return msg.send(`Added **${songs.length}** songs to the queue based of your playlist.`);
        }
        const addedSong = msg.guild.music().add(songs[0], msg.member);
        if (first === false) return msg.send({ embed: await this.queueEmbed(addedSong) });
        return null;
    }

    async play(musicInterface) {
        const song = musicInterface.queue[0];

        if (!song) {
            return musicInterface.textChannel.send({ embed: await this.stopEmbed() }).then(() => musicInterface.destroy());
        }

        await this.delayer(500);

        return musicInterface.play(song.track)
            .then(async player => {
                player.on("end", async end => {
                    if (end.reason === "REPLACED") {
                        return musicInterface.textChannel.send({ embed: await this.playEmbed(song) });
                    }
                    if (end.reason === "FINISHED") {
                        if (!musicInterface.loop) {
                            setTimeout(async () => {
                                if (musicInterface.queue.length === 0) {
                                    await musicInterface.textChannel.send({ embed: await this.stopEmbed() });
                                    return await musicInterface.destroy();
                                } else {
                                    await musicInterface.queue.shift();
                                    await this.play(musicInterface);
                                    return musicInterface.textChannel.send({ embed: await this.playEmbed(song) });
                                }
                            }, 500);
                        } else {
                            await musicInterface.queue.shift();
                            await this.play(musicInterface);
                            return musicInterface.textChannel.send({ embed: await this.playEmbed(song) });
                        }
                    }
                });
                return musicInterface.textChannel.send({ embed: await this.playEmbed(song) });
            });
    }

    /**
     * A function to check if it has permission to Connect or Speak and if it cant it will throw a response
     * @param {Discord.Message} msg The message option from which it gets the guild data
     * @param {Discord.VoiceChannel} voiceChannel The voicechannel for which it checks if it has permission to connect or speak in
     */
    async resolvePermissions(msg, voiceChannel) {
        const permissions = voiceChannel.permissionsFor(msg.guild.me);

        if (permissions.has("CONNECT") === false) {
            throw await this.Error({
                title: "Permission Error",
                color: "#d11b1b",
                description: "It seems I can't join the party since I lack the CONNECT permission"
            });
        }
        if (permissions.has("SPEAK") === false) {
            throw await this.Error({
                title: "Permission Error",
                color: "#d11b1b",
                description: "Well, well, well, it seems I can connect, but can't speak. Could you fix that please?"
            });
        }
    }

    /**
     * A embed that is sent when a new song plays
     * @param {Song} song The song object of which the data is gotten
     * @returns {MessageEmbed}
     */
    async playEmbed(song) {
        return new MessageEmbed()
            .setTitle("⏯ | Now Playing - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.cc")
            .setColor("#5cb85c")
            .setDescription([
                `• **Song:** ${song.title}`,
                `• **Author:** ${song.author}`,
                `• **Length:** ${song.stream === true ? "Live Stream" : song.friendlyDuration}`,
                `• **Requested By:** ${song.requester}`,
                `• **Link:** ${song.url}`
            ]);
    }

    /**
     * A embed that is sent when a song is queued
     * @param {Song} song The song object of which the data is gotten
     * @returns {MessageEmbed}
     */
    async queueEmbed(song) {
        return new MessageEmbed()
            .setTitle("🗒 | Song Queued - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.cc")
            .setColor("#eedc2f")
            .setDescription([
                `• **Song:** ${song.title}`,
                `• **Author:** ${song.author}`,
                `• **Length:** ${song.stream === true ? "Live Stream" : song.friendlyDuration}`,
                `• **Requested By:** ${song.requester}`,
                `• **Link:** ${song.url}`
            ]);
    }

    /**
     * A embed that is sent when the queue ends
     * @returns {MessageEmbed}
     */
    async stopEmbed() {
        return new MessageEmbed()
            .setTitle("⏹ | Queue Finished - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.cc")
            .setColor("#d9534f")
            .setDescription([
                `• **Party Over:** All the songs from the queue have finished playing. Leaving voice channel.`,
                `• **Support:** If you enjoyed PenguBot and it's features, please consider becoming a Patron at: https://www.Patreon.com/PenguBot`
            ]);
    }

    /**
     * A embed that is sent and built when an error happens
     * @param {Object} data The object containing data to make the embed
     * @returns {MessageEmbed}
     */
    async Error(data = {}) {
        return new MessageEmbed()
            .setTitle(data.title)
            .setTimestamp()
            .setFooter("© PenguBot.cc")
            .setColor(data.color)
            .setDescription(data.description);
    }

};
