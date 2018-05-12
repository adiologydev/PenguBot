const { Timestamp } = require("klasa");

class Util {

    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

    /**
	 * Turns a time string into a formated one
	 * @param {string} duration the inputed duration to format
	 * @param {string} [format] The format to use
	 * @returns {string}
	 */
    static showSeconds(duration, format = "h:mm:ss") {
        const ts = new Timestamp(format);
        return ts.display(duration);
    }

}

module.exports = Util;
