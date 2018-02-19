const { Command } = require("discord.js-commando");
const { Util } = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const { RichEmbed } = require("discord.js");
const Utils = require("../../util/musicBackend.js");

module.exports = class PlaySongCommand extends Command {

    constructor(client) {
        super(client, {
            name: "play",
            group: "music",
            memberName: "play",
            description: "Add a song to the queue and play it.",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 3
            },

            args: [{
                key: "song",
                prompt: "What would you like to listen to?\n",
                type: "string"
            }]
        });
        this.youtube = new YouTube(this.client.config.GOOGLE_API);
        this.queue = new Map();
    }
    async run(msg, { song }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const url = song ? song.replace(/<(.+)>/g, "$1") : "";
        const { voiceChannel } = msg.member;
        if (!voiceChannel) return msg.reply("I'm sorry but you need to be in a voice channel to play music!");
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has("CONNECT")) {
            return msg.reply("I cannot connect to your voice channel, make sure I have the proper permissions!");
        } else if (!permissions.has("SPEAK")) {
            return msg.reply("I cannot speak in this voice channel, make sure I have the proper permissions!");
        }

        /* const upvoter = await this.client.functions.isUpvoter(msg.author.id) || await this.client.functions.isPatreon(msg);
        if (!upvoter) {
            return msg.reply(`😫 | Pengu is under stress, you may only use Music commands if you're a **Patron** or **Upvoter** for now.

**Discord Bot List**: <https://discordbots.org/bot/PenguBot>
**Patreon**: <https://patreon.com/PenguBot>`);
        } */

        const statusMsg = await msg.reply("🔄 | Doing the Backend Magic aka Loading...");
        if (url.match(/^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/)) {
            statusMsg.edit(`Soundcloud is currently disabled.`);
        } else if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await this.youtube.getPlaylist(url);
            // Make it so Patreons can add more then 50
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                if (Object.values(videos).length > 50) {
                    if (!this.client.isOwner(msg.author) || !await this.client.functions.isPatreon(msg)) return statusMsg.edit(`${msg.author}, You can only play playlists up to 50 songs as a Free User. Consider becoming a Patron at: <https://www.patreon.com/AdityaTD>`); //eslint-disable-line
                }
                const video2 = await this.youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await this.handleVideo(video2, msg, voiceChannel, statusMsg, true); // eslint-disable-line no-await-in-loop
            }
            return msg.channel.send(`Playlist: **${playlist.title}** has been added to the queue!`);
        } else {
            try {
                var video = await this.youtube.getVideo(url); // eslint-disable-line
            } catch (error) {
                try {
                    const videos = await this.youtube.searchVideos(song, 5);
                    let index = 0;
                    statusMsg.edit(`
🎵 __**PenguBot Music - Select a Song:**__\n
${videos.map(video2 => `➡ \`${++index}\` ${video2.title} - ${video2.channel.title}`).join("\n")}
\n${msg.author}, Please provide a value to select one of the search results ranging from \`1-5\`.
					`);
                    // eslint-disable-next-line max-depth
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.author.id === msg.author.id && msg2.content > 0 && msg2.content < 8, {  // eslint-disable-line
                            maxMatches: 1,
                            time: 18000,
                            errors: ["time"]
                        });
                    } catch (err) {
                        return statusMsg.edit(`${msg.author}, ❌ | Either the request timed out or was cancelled.`);
                    }
                    const videoIndex = parseInt(response.first().content);
          var video = await this.youtube.getVideoByID(videos[videoIndex - 1].id); //eslint-disable-line
                } catch (err) {
                    console.error(err);
                    return statusMsg.edit("I could not obtain any search results.");
                }
            }
            return this.handleVideo(video, msg, voiceChannel, statusMsg);
        }
    }
    async handleVideo(video, msg, voiceChannel, statusMsg, playlist = false) {
        if (video.durationSeconds === 0) statusMsg.edit(`${msg.author}, you can't play live streams.`);
        const serverQueue = this.queue.get(msg.guild.id);
        const SongTime = video.durationSeconds ? video.durationSeconds : video.duration / 1000;
        const song = {
            id: video.id,
            title: Util.escapeMarkdown(video.title),
            url: `https://www.youtube.com/watch?v=${video.id}`,
            image: `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`,
            requester: msg.member,
            channel: video.channel,
            description: video.description,
            time: SongTime,
            timeString: Utils.timeString(SongTime)
        };
        if (!serverQueue) {
            const queueConstruct = {
                textChannel: msg.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: false,
                dispatcher: null
            };
            this.queue.set(msg.guild.id, queueConstruct);

            queueConstruct.songs.push(song);

            try {
                const connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                this.play(msg.guild, queueConstruct.songs[0], statusMsg);
            } catch (error) {
                console.error(`I could not join the voice channel: ${error.stack}`);
                this.queue.delete(msg.guild.id);
                return msg.channel.send(`I could not join the voice channel: ${error.message}`);
            }
        } else {
            serverQueue.songs.push(song);
            if (playlist) return undefined;
            else return msg.channel.send(`**${song.title}** has been added to the queue!`);
        }
        return undefined;
    }

    play(guild, song, statusMsg) {
        const serverQueue = this.queue.get(guild.id);

        if (!song) {
            setTimeout(() => {
                serverQueue.voiceChannel.leave();
                this.queue.delete(guild.id);
                return serverQueue.textChannel.send("Finished playing songs! Add some? Let's not stop the party");
            }, 2500);
            return;
        }
        serverQueue.skippers = [];
        const disptacher = serverQueue.connection.playStream(ytdl(song.url, { filter: "audioonly", audioonly: true }))
            .on("end", reason => {
                console.log(`Guild: ${guild.name} (${guild.id})`, reason);
                serverQueue.songs.shift();
                setTimeout(() => this.play(guild, serverQueue.songs[0], statusMsg), 500);
            })
            .on("error", error => {
                serverQueue.songs = [];
                serverQueue.connection.dispatcher.end("Stop command has been used!");
                console.log(`Guild: ${guild.name} (${guild.id})`, error.stack);
                return serverQueue.textChannel.send(`There was an error playing that song, trying again...`);
            });
        serverQueue.dispatcher = disptacher;
        serverQueue.playing = true;
        const permissions = serverQueue.textChannel.permissionsFor(this.client.user);
        const NowPlaying = new RichEmbed()
            .setColor(guild.me.displayColor)
            .setAuthor(`PenguBot Music | Requested By: ${song.requester.user.tag}`, song.requester.user.displayAvatarURL)
            .setDescription(`**Now Playing:** ${song.title} (${song.timeString})\n**Link:** ${song.url}`)
            .setImage(song.image);
        if (permissions.has("EMBED_LINKS")) serverQueue.textChannel.send("", { embed: NowPlaying });
        else serverQueue.textChannel.send(`**Now Playing:** ${song.title} (${song.timeString}) | (<${song.url}>) requested by ${song.requester.user.tag}`);
    }

};
