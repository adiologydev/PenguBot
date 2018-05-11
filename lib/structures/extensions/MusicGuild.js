// WIP well to do
const { Structures } = require("discord.js");

module.exports = Structures.extend("Guild", Guild => {
    /**
	 * Pengu's Extended Music Guild
	 * @extends {Guild}
	 */
    class MusicGuild extends Guild {

        /**
		 * @param {Client} client Normal D.JS guild client
		 * @param {*} data the passed data
		 */
		constructor(client, data) { // eslint-disable-line
            super(client, data);
        }

    }

    return MusicGuild;
});
