const { Argument } = require("klasa");
const url = require("url");

module.exports = class extends Argument {

    async run(arg, possible, msg) {
        arg = arg.replace(/<(.+)>/g, "$1");
        if (!msg.guild) return msg.reply("You can only use this command in a guild.");
        const results = [];
        if (this.isLink(arg)) {
            const type = this.getType(arg);
            if (type === "ytplaylist" || "scplaylist") {
                const songsData = await this.client.lavalink.resolveTracks(arg);
                if (songsData) for (const song of songsData) results.push(song);
            } else if (type === "ytsingle" || type === "scsingle") {
                const linkResults = await this.client.lavalink.resolveTracks(arg);
                if (linkResults) if (linkResults[0].track) results.push(linkResults[0]);
            } else {
                const linkResults = await this.client.lavalink.resolveTracks(arg);
                if (linkResults) if (linkResults[0].track) results.push(linkResults[0]);
            }
        } else if (arg.match(/scsearch:.*/) || arg.match(/ytsearch:.*/)) {
            const searchResults = await this.client.lavalink.resolveTracks(arg);
            if (searchResults) if (searchResults[0].track) results.push(searchResults[0]);
        } else {
            let songsData = await this.client.functions.getSongs(`ytsearch:${arg}`);
            if (!songsData) songsData = await this.client.functions.getSongs(`scsearch:${arg}`);
            const options = songsData.slice(0, 5);
            let index = 0;
            const selection = await msg.awaitReply([`🎵 | **Select a Song - PenguBot**\n`,
                `${options.map(o => `➡ \`${++index}\` ${o.info.title} - ${o.info.author} (${this.client.functions.friendlyTime(o.info.length)})`).join("\n")}`,
                `\n${msg.author}, Please select an option by replying from range \`1-5\` to add it to the queue.`], 20000);
            try {
                const vid = parseInt(selection);
                if (vid < 0 || vid > 4) return await msg.send(`${msg.author}, <:penguError:435712890884849664> Invalid Option, select from \`1-5\`. Cancelled request.`);
                results.push(songsData[vid - 1]);
            } catch (e) {
                try {
                    return await msg.send(`${msg.author}, <:penguError:435712890884849664> No options selected, cancelled request.`);
                } catch (ea) {
                    return;
                }
            }
        }
        return results;
    }

    isLink(arg) {
        const res = url.parse(arg);
        return res.protocol && res.hostname;
    }

    getType(song) {
        const ytPlaylist = /(\?|\&)list=(.*)/.exec(song); // eslint-disable-line
        const ytsmall = /https:\/\/?(www\.)?youtu\.be\/?(.*)/.exec(url);
        const ytlong = /https:\/\/?(www\.)?youtube\.com\/watch\?v=?(.*)/.exec(url);
        const soundcloud = /https:\/\/soundcloud\.com\/.*/.exec(url); // eslint-disable-line
        const scPlaylist = /https:\/\/?soundcloud.com\/.*\/.*\/.*/.exec(song);

        if (ytPlaylist) return "ytplaylist";
        if (ytsmall || ytlong) return "ytsingle";
        if (soundcloud) return "scsingle";
        if (scPlaylist) return "scplaylist";
        return null;
    }

};
