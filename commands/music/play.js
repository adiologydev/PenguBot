const { Command } = require("discord.js-commando");
const YouTube = require("simple-youtube-api");
const { get } = require("snekfetch");
const Utils = require("../../util/musicBackend.js");

module.exports = class PlaySongCommand extends Command {

    constructor(client) {
        super(client, {
            name: "play",
            group: "music",
            memberName: "play",
            description: "Request PenguBot to Play a Song.",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                key: "song",
                prompt: "What would you like to listen to?\n",
                type: "string"
            }]
        });
        this.youtube = new YouTube(this.client.config.GOOGLE_API);
        this.queue = this.client.queue;
    }
    async run(msg, { song }) {
        const channel = msg.member.voiceChannel;
        const url = song ? song.replace(/<(.+)>/g, "$1") : "";
        if (!channel) return msg.reply("❌ | Join a Voice Channel to Play Music.");
        const permissions = channel.permissionsFor(msg.client.user);
        if (!permissions.has("CONNECT")) {
            return msg.reply("❌ | I cannot connect to your voice channel, make sure I have the proper permissions!");
        } else if (!permissions.has("SPEAK")) {
            return msg.reply("❌ | I cannot speak in this voice channel, make sure I have the proper permissions!");
        }

        if (Utils.validURL(song)) {
            // Handling Playlists
            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                const statusMsg = await msg.reply("🔄 | Loading your playlist, please wait...");
                const playlist = await this.youtube.getPlaylist(url);
                // Make it so Patreons can add more then 25
                const videos = await playlist.getVideos();
                for (const video of Object.values(videos)) {
                    if (Object.values(videos).length > 25) {
                        if (!await this.isPatreon(msg)) return statusMsg.edit(`:x: | ${msg.author}, You can only play playlists of up to 25 songs. Remove this restriction by becoming a Patron at <https://www.patreon.com/PenguBot>`); //eslint-disable-line
                    }
                    const video2 = await this.getLLTrack(`https://www.youtube.com/watch?v=${video.id}`); // eslint-disable-line no-await-in-loop
                    await this.musicHandler(msg.guild, msg, video2, channel, true); // eslint-disable-line no-await-in-loop
                }
                return statusMsg.edit(`📰 | **Queue:**: ${playlist.title} playlist has been added to the queue.`);
            } else {
                const music = await this.getLLTrack(song);
                this.musicHandler(msg.guild, msg, music, channel, false);
            }
        } else if (song.startsWith("ytsearch:") || song.startsWith("scsearch:")) {
            const moosic = await this.getLLTrack(song);
            this.musicHandler(msg.guild, msg, moosic, channel, false);
        } else {
            // Searching Videos on YouTube
            const statusMsg = await msg.reply("🔄 | Pengu is loading a music selector, please wait...");
            try {
                const videos = await this.youtube.searchVideos(song, 5);
                let index = 0;
                statusMsg.edit(`
🎵 **Pengu Music - Select a Song:**\n
${videos.map(video2 => `➡ \`${++index}\` ${video2.title} - ${video2.channel.title}`).join("\n")}
\n${msg.author}, Please provide a value to select one of the search results ranging from \`1-5\`.
                `);
                // eslint-disable-next-line max-depth
                try {
                    var response = await msg.channel.awaitMessages(msg2 => msg2.author.id === msg.author.id && msg2.content > 0 && msg2.content < 8, {  // eslint-disable-line
                        maxMatches: 1,
                        time: 20000,
                        errors: ["time"]
                    });
                } catch (err) {
                    return statusMsg.edit(`${msg.author}, ❌ | Either the request has timed out or was cancelled.`);
                }
                const videoIndex = parseInt(response.first().content);
      var video = await this.youtube.getVideoByID(videos[videoIndex - 1].id); //eslint-disable-line
            } catch (err) {
                console.error(err);
                return statusMsg.edit("❌ | I could not obtain any search results.");
            }
            const searchedMusic = await this.getLLTrack(`https://www.youtube.com/watch?v=${video.id}`);
            this.musicHandler(msg.guild, msg, searchedMusic, channel, false);
        }
    }

    async musicHandler(guild, msg, music, voiceChannel, playlist = false) {
        try {
            const queue = this.queue.get(guild.id);
            const song = {
                id: music.info.identifier,
                track: music.track,
                title: music.info.title,
                url: music.info.uri,
                requester: msg.member,
                author: music.info.author,
                time: music.info.length,
                readTime: Utils.timeString(music.info.length)
            };

            if (!queue) {
                const queueConst = {
                    text: msg.channel,
                    voice: voiceChannel,
                    songs: [],
                    connection: null,
                    playing: false
                };
                this.queue.set(guild.id, queueConst);
                queueConst.songs.push(song);

                try {
                    const player = await this.client.player.join({
                        guild: msg.guild.id,
                        channel: voiceChannel.id,
                        host: "localhost"
                    });
                    player.on("end", e => {
                        // Skip Event
                        if (e.reason === "REPLACED") {
                            const songa = this.queue.get(msg.guild.id).songs[0];
                            return queueConst.text.send(`⏯ | **Now Playing:** ${songa.title} (${songa.readTime}) by ${songa.author} - (<${songa.url}>) | Requested by ${songa.requester.user.tag}`);
                        }
                        // Finished Event
                        if (e.reason === "FINISHED" || e.reason === "STOPPED") {
                            setTimeout(async () => {
                                queueConst.songs.shift();
                                if (queueConst.songs.length === 0) {
                                    this.client.player.leave(guild.id);
                                    this.queue.delete(guild.id);
                                    return queueConst.text.send("🎵 | **Music:** Finished playing the current queue. Enjoyed what you heard? Why not support us on Patreon at <https://www.Patreon.com/PenguBot>");
                                } else {
                                    const songa = queueConst.songs[0];
                                    await queueConst.connection.play(queueConst.songs[0].track);
                                    return queueConst.text.send(`⏯ | **Now Playing:** ${songa.title} (${songa.readTime}) by ${songa.author} - (<${songa.url}>) | Requested by ${songa.requester.user.tag}`);
                                }
                            }, 500);
                        }
                    });
                    // Error Event
                    player.on("error", async (error) => {
                        queue.songs = [];
                        console.log(`| MUSIC ERROR |\n${error}`);
                        await queue.connection.disconnect();
                        await this.client.player.leave(guild.id);
                        queue.text.send(`❌ | There was an error playing that song, please trying again or report it to the developer.`);
                        this.client.queue.delete(guild.id);
                    });

                    // Play Intiial Event
                    queueConst.connection = player;
                    player.play(song.track);
                    queueConst.playing = true;
                    queueConst.text.send(`⏯ | **Now Playing:** ${song.title} (${song.readTime}) by ${song.author} - (<${song.url}>) | Requested by ${song.requester.user.tag}`);
                } catch (e) {
                    queueConst.connection.disconnect();
                    this.queue.delete(msg.guild.id);
                    this.client.player.leave(msg.guild.id);
                    console.log(`| MUSIC ERROR |\n${e}`);
                    return msg.channel.send(`❌ | Pengu Tripped On A Wire!\n\`\`\`${e.message}\`\`\``);
                }
            } else {
                // Add Songs To Queue
                queue.songs.push(song);
                if (playlist) return undefined;
                return msg.channel.send(`📰 | **Queue:** ${song.title} (${song.readTime}) by ${song.author} has been added to the queue.`);
            }
            return undefined;
        } catch (e) {
            console.log(`| MUSIC ERROR (Handler) |\n${e}`);
            if (!playlist) return msg.channel.send(":x: | Video is blocked in Pengu's country, please retry with a different video.");
            return undefined;
        }
    }

    // Resolve Tracks
    async getLLTrack(song) {
        const data = await get(`http://localhost:2333/loadtracks?identifier=${encodeURIComponent(song)}`)
            .set("Authorization", this.client.config.music.RESTPass)
            .catch(() => null);

        if (!data) return null;
        return data.body[0];
    }

    async isPatreon(msg) {
        const role = msg.client.guilds.find("id", "303195322514014210").roles.find("id", "381824166615056395");
        if (role.members.exists("id", msg.author.id)) {
            return true;
        } else {
            const [rows] = await msg.client.db.query(`SELECT * FROM patreons WHERE id = '${msg.author.id}'`);
            if (!rows || !rows.length) return false;
            return rows[0].id === msg.author.id;
        }
    }

};
