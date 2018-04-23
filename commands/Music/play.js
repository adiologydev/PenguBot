const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 8,
            permLevel: 0,
            aliases: ["musicplay"],
            botPerms: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS", "ATTACH_FILES"],
            description: (msg) => msg.language.get("COMMAND_PLAY_DESCRIPTION"),
            usage: "<song:string>",
            extendedHelp: "No extended help available."
        });
    }

    // Main Command Functions
    async run(msg, [song]) {
        if (!msg.member.voiceChannel) return msg.channel.send("<:penguError:435712890884849664> ***You're currently not in a Voice Channel, please join one to use this command.***");
        const songData = await this.client.functions.getSongs(`ytsearch:${song}`);
        if (!songData) return msg.channel.send("<:penguError:435712890884849664> ***That song could not be found, please try with a different one.***");
        await this.musicHandler(msg, songData[0], msg.guild, msg.member.voiceChannel);
    }

    // Creating Volume Integer for Guild's Configuration
    async init() {
        if (!this.client.gateways.guilds.schema.has("musicVolume")) {
            this.client.gateways.guilds.schema.add("musicVolume", { type: "integer", default: 90, configurable: false });
        }
    }

    async musicHandler(msg, songData, guild, vc, playlist = false) {
        const queue = this.client.queue.get(guild.id);

        // Creating new song item
        const song = {
            track: songData.track,
            name: songData.info.title,
            author: songData.info.author,
            stream: songData.isStream,
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
                await queueConst.tc.send("<:penguError:435712890884849664> ***There seems to be an error, please try again or seek help at: <https://www.pengubot.cc/invite>.***");
                return console.error(`-- musicHandler --\n${e}`);
            }
        } else {
            queue.songs.push(song);
            if (playlist === true) return;
            return queue.tc.send({ embed: await this.queueEmbed(song) });
        }
    }

    // Music Play Handler
    async musicPlay(song, guild) {
        const queue = this.client.queue.get(guild.id);
        const player = this.client.lavalink.get(guild.id);
        await player.play(song.track);

        // Event Handling
        player.on("end", async end => {
            if (end.reason === "REPLACED") {
                return queue.tc.send({ embed: await this.playEmbed(queue.songs[0]) });
            }
            if (end.reason === "FINISHED") {
                setTimeout(async () => {
                    queue.songs.shift();
                    if (queue.songs.length === 0) {
                        await this.client.lavalink.leave(guild.id);
                        await queue.tc.send({ embed: await this.stopEmbed() });
                        return this.client.queue.delete(guild.id);
                    } else {
                        await player.play(queue.songs[0].track);
                        return queue.tc.send({ embed: await this.playEmbed(queue.songs[0]) });
                    }
                }, 500);
            }
        });
        return queue.tc.send({ embed: await this.playEmbed(queue.songs[0]) });
    }

    async playEmbed(song) {
        return new this.client.methods.Embed()
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
        return new this.client.methods.Embed()
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
        return new this.client.methods.Embed()
            .setTitle("⏹ | Queue Finished - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.cc")
            .setColor("#d9534f")
            .setDescription([`• **Party Over:** All the songs from the queue have finished playing. Leaving voice channel.`,
                `• **Support:** If you enjoyed PenguBot and it's features, please consider becoming a Patron at: https://www.Patreon.com/PenguBot`]);
    }

};
