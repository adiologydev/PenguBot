const { Command } = require("klasa");
const { lyricsRequest, lyricsFormatter } = require("../../lib/Util/Util.js");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["songlyrics", "lyric"],
            permissionLevel: 0,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_LYRICS_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "[song:string]"
        });
    }

    async run(msg, [song = null]) {
        const music = msg.guild.music();

        if (!song) {
            if (!music.playing) return msg.send("<:penguError:435712890884849664> ***There is no music playing so you can't use this flag***");
            const res = await music.lyrics();
            return msg.send({ embed: await this.lyricsEmbed(res.extendedsong, res.artist, res.picture, res.lyricdata, res.lyricsbody) });
        } else {
            const req = await lyricsRequest(`search?q=${song}`);
            const res = await lyricsFormatter(req);
            return msg.send({ embed: await this.lyricsEmbed(res.extendedsong, res.artist, res.picture, res.lyricdata, res.lyricsbody) });
        }
    }

    lyricsEmbed(extendedsong, artist, picture, lyricdata, lyricsbody) {
        return new MessageEmbed()
            .setColor("#428bca")
            .setAuthor(`${extendedsong} - ${artist} | Lyrics`, this.client.user.avatarURL, `http://genius.com/${lyricdata.result.path}`)
            .setTimestamp()
            .setFooter("© PenguBot.cc")
            .setDescription(lyricsbody.length >= 1900 ? `${lyricsbody.substr(0, 1900)}...` : lyricsbody)
            .setThumbnail(picture);
    }

};
