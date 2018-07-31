const MusicCommand = require("../../lib/structures/MusicCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireDJ: true,
            cooldown: 5,
            aliases: ["musicplay"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS", "ATTACH_FILES"],
            description: language => language.get("COMMAND_PLAY_DESCRIPTION"),
            usage: "<song:songname>",
            extendedHelp: "No extended help available."
        });
        this.delayer = time => new Promise(res => setTimeout(() => res(), time));
    }

    async run(msg, [songs]) {
        await msg.guild.members.fetch(msg.author.id).catch(() => {
            throw msg.language.get("ER_MUSIC_TRIP");
        });

        const { music } = msg.guild;
        music.textChannel = msg.channel;

        return this.handle(msg, songs);
    }

    async handle(msg, songs) {
        const musicInterface = msg.guild.music;
        try {
            if (!musicInterface.playing) await this.handleSongs(msg, songs);
            else return this.handleSongs(msg, songs);
            return this.play(musicInterface);
        } catch (error) {
            this.client.console.error(error);
            return musicInterface.textChannel.send(`There was an error: ${error}`).then(() => musicInterface.destroy());
        }
    }

    async handleSongs(msg, songs) {
        const musicInterface = msg.guild.music;
        if (!musicInterface) return msg.sendMessage(msg.language.get("ER_MUSIC_TRIP"));
        const isUpvoter = await this.client.functions.isUpvoter(msg.author.id);
        if (songs.tracks.length > 1) {
            const limit = this.client.config.main.patreon && isUpvoter ? 1000 : 74;
            const limitedSongs = songs.tracks.slice(0, limit).filter(a => a.track !== undefined);
            musicInterface.queue.push(...limitedSongs);
            if (songs.tracks.length >= 75 && !this.client.config.main.patreon && !isUpvoter) {
                return msg.sendEmbed(this.supportEmbed(songs.playlist));
            } else {
                return msg.send(`🎧 | **Queue:** Added **${songs.tracks.length}** songs from **${songs.playlist}** to the queue based on your playlist.`);
            }
        } else {
            musicInterface.queue.push(...songs.tracks.filter(a => a.track !== undefined));
            if (!musicInterface.playing) return;
            musicInterface.playing = true;
            return msg.send(this.queueEmbed(songs.tracks[0]));
        }
    }

    async play(musicInterface) {
        const [song] = musicInterface.queue;

        if (!song) {
            return musicInterface.textChannel.sendEmbed(this.stopEmbed).then(() => musicInterface.destroy());
        }

        await this.delayer(250);

        return musicInterface.play(song.track)
            .then(async player => {
                musicInterface.playing = true;
                if (!musicInterface.looping) await musicInterface.textChannel.send(this.playEmbed(song));
                player.once("end", data => {
                    if (data.reason === "REPLACED") return;
                    if (!musicInterface.looping) musicInterface.skip(false);
                    this.play(musicInterface);
                });
                player.once("error", e => {
                    musicInterface.textChannel.send(`I am very sorry but was an error, please try again or contact us at https://discord.gg/kWMcUNe | Error: ${e.error}`);
                });
            });
    }

    // Response Embeds
    playEmbed(song) {
        return new MessageEmbed()
            .setTitle("⏯ | Now Playing - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setColor("#5cb85c")
            .setDescription(`• **Title:** ${song.title}
• **Author:** ${song.author}
• **Length:** ${song.friendlyDuration}
• **Requested By:** ${song.requester}
• **Link:** ${song.url}`);
    }

    queueEmbed(song) {
        return new MessageEmbed()
            .setTitle("🗒 | Song Queued - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setColor("#eedc2f")
            .setDescription(`• **Title:** ${song.title}
• **Author:** ${song.author}
• **Length:** ${song.friendlyDuration}
• **Requested By:** ${song.requester}
• **Link:** ${song.url}`);
    }

    get stopEmbed() {
        return new MessageEmbed()
            .setTitle("⏹ | Queue Finished - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setColor("#d9534f")
            .setDescription(`• **Party Over:** All the songs from the queue have finished playing. Leaving voice channel.
• **Support:** If you enjoyed PenguBot and it's features, please consider becoming a Patron at: https://www.Patreon.com/PenguBot`);
    }

    supportEmbed(playlistName) {
        return new MessageEmbed()
            .setTitle("Support us!")
            .setColor("#f96854")
            .setDescription(`🎧 | **Queue:** Playlist **${playlistName}** has been added to the queue.\n This playlist has more than 75 songs but only 75 were added.
If you wish bypass this limit become our Patreon today at https://patreon.com/PenguBot and use our Patron Only Bot.`);
    }

};
