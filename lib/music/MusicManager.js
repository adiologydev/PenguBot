const Discord = require("discord.js");
const { Guild, Collection } = Discord;
const MusicInterface = require("./MusicInterface");

class MusicManager extends Collection {

    /**
     * @since 2.0.1
     * @param {Discord.Client} client The client object passed during startup
     */
    constructor(client) {
        super();
        /**
         * The d.js client object
         * @since 2.0.1
         * @type {Discord.Client}
         * @private
         */
        Object.defineProperty(this, "client", { value: client });
    }

    /**
     * Create a new interface for the given guild.
     * @since 2.0.1
     * @param {Guild} guild A Guild instance.
     * @returns {MusicInterface}
     */
    add(guild) {
        const check = !guild ? "Please provide a guild instance" : !(guild instanceof Guild) ? "The parameter 'Guild' must be an instance of guild." : null;
        if (check) throw check;
        const guildInterface = new MusicInterface(guild);
        super.set(guild.id, guildInterface);
        return guildInterface;
    }

}

module.exports = MusicManager;
