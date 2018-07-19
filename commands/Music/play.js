const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 5,
            aliases: ["musicplay"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS", "ATTACH_FILES"],
            description: msg => msg.language.get("COMMAND_PLAY_DESCRIPTION"),
            usage: "<song:songname>",
            extendedHelp: "No extended help available."
        });
        this.music = true;
        this.delayer = time => new Promise(res => setTimeout(() => res(), time));
    }

    async run(msg, [songs]) {
        await msg.guild.members.fetch(msg.author.id).catch(() => {
            throw msg.language.get("ER_MUSIC_TRIP");
        });

        const { voiceChannel } = msg.member;
        if (!voiceChannel) throw "I'm sorry but you need to be in a voice channel to play some music!";
        this.resolvePermissions(msg, voiceChannel);
        const { music } = msg.guild;
        music.textChannel = msg.channel;

        return this.handle(msg, songs);
    }

    async handle(msg, songs) {
        const musicInterface = msg.guild.music;
        try {
            if (!musicInterface.playing) await this.handleSongs(msg, songs);
            else return this.handleSongs(msg, songs);

            await musicInterface.join(msg.member.voiceChannel);
            return this.play(musicInterface);
        } catch (error) {
            this.client.console.error(error);
            return musicInterface.textChannel.send(`I could not join the voice channel: ${error}`).then(() => musicInterface.destroy());
        }
    }

    async handleSongs(msg, songs) {
        const musicInterface = msg.guild.music;
        if (songs.length > 1) {
            const limit = this.client.config.main.patreon && await this.client.functions.isUpvoter(msg.author.id) ? 1000 : 74;
            const limitedSongs = songs.slice(0, limit);
            musicInterface.queue.push(...limitedSongs);
            if (songs.length >= 75 && this.client.config.main.patreon === false && !await this.client.functions.isUpvoter(msg.author.id)) {
                return msg.send({
                    embed: new MessageEmbed()
                        .setTitle("Support us!")
                        .setColor("#f96854")
                        .setDescription(["🎧 | **Queue:** Playlist has been added to the queue. This playlist has more than 75 songs but only 75 were added.",
                            "If you wish bypass this limit become our Patreon today at https://patreon.com/PenguBot and use our Patron Only Bot."])
                });
            } else {
                return msg.send(`🎧 | **Queue:** Added **${songs.length}** songs to the queue based on your playlist.`);
            }
        } else {
            musicInterface.queue.push(...songs);
            if (!musicInterface.playing) return;
            musicInterface.playing = true;
            return msg.send(this.queueEmbed(songs[0]));
        }
    }

    async play(musicInterface) {
        const [song] = musicInterface.queue;

        if (!song) {
            return musicInterface.textChannel.send(this.stopEmbed()).then(() => musicInterface.destroy());
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
                player.once("error", this.client.console.error);
            });
    }

    resolvePermissions(msg, voiceChannel) {
        const permissions = voiceChannel.permissionsFor(msg.guild.me);

        if (permissions.has("CONNECT") === false) throw "I don't have permissions to join your Voice Channel. I am missing the `CONNECT` permission.";
        if (permissions.has("SPEAK") === false) throw "I can connect... but not speak. Please turn on this permission so I can spit some bars.";
    }

    playEmbed(song) {
        return new MessageEmbed()
            .setTitle("⏯ | Now Playing - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setColor("#5cb85c")
            .setDescription(`• **Title:** ${song.title}
• **Author:** ${song.author}
• **Length:** ${song.isStream === true ? "Live Stream" : song.friendlyDuration}
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
• **Length:** ${song.isStream === true ? "Live Stream" : song.friendlyDuration}
• **Requested By:** ${song.requester}
• **Link:** ${song.url}`);
    }

    stopEmbed() {
        return new MessageEmbed()
            .setTitle("⏹ | Queue Finished - PenguBot")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setColor("#d9534f")
            .setDescription(`• **Party Over:** All the songs from the queue have finished playing. Leaving voice channel.
• **Support:** If you enjoyed PenguBot and it's features, please consider becoming a Patron at: https://www.Patreon.com/PenguBot`);
    }

};
