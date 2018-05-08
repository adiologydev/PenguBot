const { Command } = require("klasa");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

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
    }

    // Main Command Functions
    async run(msg, [song]) {
        if (!msg.member.voiceChannel) return msg.channel.send("<:penguError:435712890884849664> ***You're currently not in a Voice Channel, please join one to use this command.***");
        if (this.client.functions.validURL(song)) {
            const playlist = /(\?|\&)list=(.*)/.exec(song); // eslint-disable-line
            const soundCloud = /https:\/\/soundcloud\.com\/.*/.exec(song); // eslint-disable-line
            // YouTube URLS
            const YTMini = /https:\/\/?(www\.)?youtu\.be\/?(.*)/.exec(song);
            const YTFull = /https:\/\/?(www\.)?youtube\.com\/watch\?v=?(.*)/.exec(song);
            const scPlaylist = /https:\/\/?soundcloud.com\/.*\/.*\/.*/.exec(song);
            if (playlist) {
                // Playlist Handling
                const { body } = await get(`https://www.googleapis.com/youtube/v3/playlists?part=id,snippet&id=${playlist[2]}&key=${this.client.config.keys.music.youtube}`);
                if (!body.items[0]) return msg.channel.send("<:penguError:435712890884849664> ***That youtube playlist could not be found, please try with a different one.***");
                const songData = await this.client.functions.getSongs(song);
                if (!songData) return msg.channel.send("<:penguError:435712890884849664> ***That playlist could not be found, please try with a different one.***");
                let limit; if (this.client.config.main.patreon === false) { limit = 24; } else { limit = 1000; } // eslint-disable-line
                for (let i = 0; i <= limit; i++) {
                    await this.musicHandler(msg, songData[i], msg.guild, msg.member.voiceChannel, true).catch(() => null);
                }
                if (songData.length >= 25 && this.client.config.main.patreon === false) return msg.channel.send(`🗒 | **${body.items[0].snippet.title}** playlist has been added to the queue. This playlist has more than 25 songs but only 25 were added, to bypass this limit become our Patreon today at https://patreon.com/PenguBot`); // eslint-disable-line
                return msg.channel.send(`🗒 | **${body.items[0].snippet.title}** playlist has been added to the queue.`);
            } else if (soundCloud) {
                // Handling SoundCloud
                if (scPlaylist) {
                    const tracks = await this.client.functions.getSongs(scPlaylist[0]);
                    for (let i = 0; i <= tracks.length; i++) {
                        await this.musicHandler(msg, tracks[i], msg.guild, msg.member.voiceChannel, true).catch(() => null);
                    }
                    return msg.channel.send(`🗒 | Soundcloud playlist has been added to the queue.`);
                }
                const songData = await this.client.functions.getSongs(soundCloud[0]);
                if (!songData) return msg.channel.send("<:penguError:435712890884849664> ***That song could not be found, please try with a different one.***");
                await this.musicHandler(msg, songData[0], msg.guild, msg.member.voiceChannel);
            } else if (YTMini) {
                // YouTube Mini URL Handling
                const songData = await this.client.functions.getSongs(YTMini[0]);
                if (!songData) return msg.channel.send("<:penguError:435712890884849664> ***That song could not be found, please try with a different one.***");
                await this.musicHandler(msg, songData[0], msg.guild, msg.member.voiceChannel);
            } else if (YTFull) {
                // YouTube Full URL Handling
                const songData = await this.client.functions.getSongs(YTFull[0]);
                if (!songData) return msg.channel.send("<:penguError:435712890884849664> ***That song could not be found, please try with a different one.***");
                await this.musicHandler(msg, songData[0], msg.guild, msg.member.voiceChannel);
            } else {
                // URL Handling
                const songData = await this.client.functions.getSongs(`${song}`);
                if (!songData) return msg.channel.send("<:penguError:435712890884849664> ***That song could not be found, please try with a different one.***");
                await this.musicHandler(msg, songData[0], msg.guild, msg.member.voiceChannel);
            }
        } else if (song.match(/scsearch:.*/) || song.match(/ytsearch:.*/)) {
            // Wildcard Handling
            const songData = await this.client.functions.getSongs(song);
            if (!songData) return msg.channel.send("<:penguError:435712890884849664> ***That song could not be found, please try with a different one.***");
            this.musicHandler(msg, songData[0], msg.guild, msg.member.voiceChannel);
        } else {
            // Search from YouTube
            const songsData = await this.client.functions.getSongs(`ytsearch:${song}`);
            if (!songsData) return msg.channel.send("<:penguError:435712890884849664> ***Results for this song could not be found, please try with a different one.***");
            const options = songsData.slice(0, 5);
            let index = 0;
            const selection = await msg.awaitReply([`🎵 | **Select a Song - PenguBot**\n`,
                `${options.map(o => `➡ \`${++index}\` ${o.info.title} - ${o.info.author} (${this.client.functions.friendlyTime(o.info.length)})`).join("\n")}`,
                `\n${msg.author}, Please select an option by replying from range \`1-5\` to add it to the queue.`], 20000);
            try {
                const vid = parseInt(selection);
                if (vid < 0 || vid > 4) return await msg.channel.send(`${msg.author}, <:penguError:435712890884849664> Invalid Option, select from \`1-5\`. Cancelled request.`);
                // selection.delete();
                await this.musicHandler(msg, songsData[vid - 1], msg.guild, msg.member.voiceChannel);
            } catch (e) {
                try {
                    return await msg.channel.send(`${msg.author}, <:penguError:435712890884849664> No options selected, cancelled request.`);
                } catch (ea) {
                    return;
                }
            }
        }
    }

    // Creating Volume Integer for Guild's Configuration
    async init() {
        if (!this.client.gateways.guilds.schema.has("musicVolume")) {
            this.client.gateways.guilds.schema.add("musicVolume", { type: "integer", default: 90, configurable: false });
        }
        if (!this.client.gateways.guilds.schema.has("pengu-dj")) {
            this.client.gateways.guilds.schema.add("pengu-dj", { type: "user", array: true });
        }
    }

    async musicHandler(msg, songData, guild, vc, playlist = false) {
        const queue = this.client.queue.get(guild.id);
        // Creating new song item
        const song = {
            track: songData.track,
            name: songData.info.title,
            author: songData.info.author,
            stream: songData.info.isStream,
            length: songData.info.length,
            url: songData.info.uri,
            requester: msg.author
        };

        // If Guild does not already have a queue
        if (!queue) {
            const queueConst = {
                vc: vc,
                tc: msg.channel,
                loop: false,
                songs: [],
                volume: msg.guild.configs.musicVolume
            };
            this.client.queue.set(guild.id, queueConst);
            queueConst.songs.push(song);
            try {
                await this.client.lavalink.join({
                    guild: msg.guild.id,
                    channel: msg.member.voiceChannelID,
                    host: "localhost"
                }, { selfdeaf: true });
                return this.musicPlay(song, guild);
            } catch (e) {
                await msg.channel.send("<:penguError:435712890884849664> ***There seems to be an error, please try again or seek help at: <https://www.pengubot.cc/invite>.***");
                return console.error(`-- musicHandler --\n${e}`);
            }
        } else {
            queue.songs.push(song);
            if (playlist === true) return;
            return msg.channel.send({ embed: await this.queueEmbed(song) });
        }
    }

    // Music Play Handler
    async musicPlay(song, guild) {
        const queue = this.client.queue.get(guild.id);
        const player = this.client.lavalink.get(guild.id);
        await player.play(song.track);
        await player.volume(guild.configs.musicVolume);

        // Event Handling
        player.on("end", async end => {
            if (end.reason === "REPLACED") {
                return queue.tc.send({ embed: await this.playEmbed(queue.songs[0]) });
            }
            if (end.reason === "FINISHED") {
                setTimeout(async () => {
                    if (!queue.loop) queue.songs.shift();
                    if (queue.songs.length === 0) {
                        await this.client.lavalink.leave(guild.id);
                        await queue.tc.send({ embed: await this.stopEmbed() });
                        return this.client.queue.delete(guild.id);
                    } else {
                        await player.play(queue.songs[0].track);
                        await player.volume(guild.configs.musicVolume);
                        return queue.tc.send({ embed: await this.playEmbed(queue.songs[0]) });
                    }
                }, 500);
            } else {
                setTimeout(async () => {
                    if (!queue.loop) queue.songs.shift();
                    if (queue.songs.length === 0) {
                        await this.client.lavalink.leave(guild.id);
                        await queue.tc.send({ embed: await this.stopEmbed() });
                        return this.client.queue.delete(guild.id);
                    } else {
                        await player.play(queue.songs[0].track);
                        await player.volume(guild.configs.musicVolume);
                        return queue.tc.send({ embed: await this.playEmbed(queue.songs[0]) });
                    }
                }, 500);
            }
        });
        return queue.tc.send({ embed: await this.playEmbed(queue.songs[0]) });
    }

    async playEmbed(song) {
        return new MessageEmbed()
            .setTitle("⏯ | Now Playing - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.cc")
            .setColor("#5cb85c")
            .setDescription([`• **Song:** ${song.name}`,
                `• **Author:** ${song.author}`,
                `• **Length:** ${song.stream === true ? "Live Stream" : this.client.functions.friendlyTime(song.length)}`,
                `• **Requested By:** ${song.requester.tag}`,
                `• **Link:** ${song.url}`]);
    }

    async queueEmbed(song) {
        return new MessageEmbed()
            .setTitle("🗒 | Song Queued - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.cc")
            .setColor("#eedc2f")
            .setDescription([`• **Song:** ${song.name}`,
                `• **Author:** ${song.author}`,
                `• **Length:** ${song.stream === true ? "Live Stream" : this.client.functions.friendlyTime(song.length)}`,
                `• **Requested By:** ${song.requester.tag}`,
                `• **Link:** ${song.url}`]);
    }

    async stopEmbed() {
        return new MessageEmbed()
            .setTitle("⏹ | Queue Finished - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.cc")
            .setColor("#d9534f")
            .setDescription([`• **Party Over:** All the songs from the queue have finished playing. Leaving voice channel.`,
                `• **Support:** If you enjoyed PenguBot and it's features, please consider becoming a Patron at: https://www.Patreon.com/PenguBot`]);
    }

};
