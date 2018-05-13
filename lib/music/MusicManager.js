const { Guild, Collection } = require("discord.js");
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
         * @private
         */
        Object.defineProperty(this, "client", { value: client });
    }

    /**
     * Create a new interface.
     * @param {Guild} guild A Guild instance.
     * @returns {MusicInterface}
     */
    add(guild) {
        if (!(guild instanceof Guild)) throw "The parameter 'Guild' must be a guild instance.";
        const guildInterface = new MusicInterface(guild);
        super.set(guild.id, guildInterface);
        return guildInterface;
    }

}

module.exports = MusicManager;
