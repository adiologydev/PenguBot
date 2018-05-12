const { Structures } = require("discord.js");

module.exports = Structures.extend("Guild", Guild => {
    /**
	 * Pengu's Extended Guild
	 * @extends {Guild}
	 */
    class PenguGuild extends Guild {

        /**
		 * @param {...Object} args Normal D.JS guild args
		 */
		constructor(...args) { // eslint-disable-line
            super(...args);
        }

    }

    return PenguGuild;
});
