const { Structures } = require("discord.js");

module.exports = Structures.extend("Guild", Guild => {
    /**
	 * Pengu's Extended Guild
	 * @extends {Guild}
	 */
    class PenguGuild extends Guild {

        /**
		 * @param {...*} args Normal D.JS guild args
		 */
        // its a useless contructor so this stays here
        constructor(...args) { // eslint-disable-line
            super(...args);
        }

    }

    return PenguGuild;
});
