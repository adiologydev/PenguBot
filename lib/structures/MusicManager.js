const { Guild, Collection } = require("discord.js");
const MusicInterface = require("./MusicInterface");

class MusicManager extends Collection {

    /**
     * Create a new interface.
     * @param {PenguGuild} guild A Guild instance.
     * @returns {MusicInterface}
     */
    add(guild) {
        if (!(guild instanceof Guild)) throw "The parameter 'Guild' must be a guild instance.";
        if (this.has(guild.id)) return this.get(guild.id);
        const guildInterface = new MusicInterface(guild);
        this.set(guild.id, guildInterface);
        return guildInterface;
    }

}

module.exports = MusicManager;
