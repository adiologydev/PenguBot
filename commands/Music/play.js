const Song = require("../../lib/music/Song.js"); // eslint-disable-line
const MusicInterface = require("../../lib/music/MusicInterface.js"); // eslint-disable-line
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

        this.Music = true;

        /**
         * A function to delay code execution
         * @param {number} time The amount of time to delay for
         * @returns {Promise<setTimeout>}
         */
        this.delayer = time => new Promise(res => setTimeout(() => res(), time));

        this.playlist = toExec => /(\?|&)list=(.*)/.exec(toExec);
        this.YTMini = toExec => /https:\/\/?(www\.)?youtu\.be\/?(.*)/.exec(toExec);
        this.YTFull = toExec => /https:\/\/?(www\.)?youtube\.com\/watch\?v=?(.*)/.exec(toExec);
        this.scPlaylist = toExec => /https:\/\/?soundcloud.com\/.*\/.*\/.*/.exec(toExec);
        this.soundCloud = toExec => /https:\/\/soundcloud\.com\/.*/.exec(toExec);

        this.globalMSG = null;
    }

    async run(msg, [song]) {
        const music = msg.guild.music();
        const { voiceChannel } = msg.member;

        this.resolvePermissions(msg, voiceChannel);

        music.textChannel = msg.channel;
        this.globalMSG = msg;

        await this.typeResolver(msg, song, music);

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
        if (songs.length > 1) {
            let limit;
            if (this.client.config.main.patreon === false) { limit = 74; } else { limit = 2000; }
            for (let i = 0; i <= limit; i++) {
                msg.guild.music().add(songs[i], msg.member);
            }
            if (songs.length >= 75 && this.client.config.main.patreon === false) {
                return msg.send({
                    embed: await this.Error({
                        title: "Support us!",
                        color: "#f96854",
                        description: [
                            "🎧 | **Queue:** Playlist has been added to the queue. This playlist has more than 75 songs but only 75 were added",
                            "If you wish bypass this limit become our Patreon today at https://patreon.com/PenguBot and use our Patron Only Bot."
                        ]
                    })
                });
            }
            return msg.send(`🎧 | **Queue:** Added **${songs.length}** songs to the queue based on your playlist.`);
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
                                    const channel = musicInterface.textChannel;
                                    await this.play(musicInterface);
                                    return channel.send({ embed: await this.playEmbed(song) });
                                }
                            }, 500);
                        } else {
                            await musicInterface.queue.shift();
                            const channel = musicInterface.textChannel;
                            await this.play(musicInterface);
                            return channel.send({ embed: await this.playEmbed(song) });
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
     * A function to resolve the type
     * @param {Discord.Message} msg The msg Object
     * @param {string} song the song string to resolve
     * @param {MusicInterface} music The music interface
     * @returns {Song}
     */
    async typeResolver(msg, song, music) {
        const url = encodeURIComponent(song);
        if (this.playlist(url)) {
            const songsData = await this.client.lavalink.resolveTracks(song);
            if (!songsData) return music.textChannel.sendMessage("<:penguError:435712890884849664> ***That playlist could not be found, please try with a different one.***");
            return this.handle(msg, songsData, music);
        } else if (this.soundCloud(url)) {
            const sc = this.scPlaylist(song);
            if (sc) {
                const tracks = await this.client.lavalink.resolveTracks(sc[0]);
                for (let i = 0; i <= tracks.length; i++) {
                    await this.handle(msg, tracks[i], music);
                }
                return music.textChannel.send(`🗒 | Soundcloud playlist has been added to the queue.`);
            }
            const saang = this.soundCloud(url);
            const songData = await this.client.lavalink.resolveTracks(saang[0]);
            if (!songData) return msg.sendMessage("<:penguError:435712890884849664> ***That song could not be found, please try with a different one.***");
            return this.handle(msg, songData[0], music);
        }
        return null;
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
