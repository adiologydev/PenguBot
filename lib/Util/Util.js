const { Timestamp } = require("klasa");

class Util {

    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

    /**
	 * Turns a time string into a formated one
	 * @param {string} timeString the inputed duration to format
	 * @param {string} [format] The format to use
	 * @returns {string}
	 */
    static formatTime(timeString, format = "h:mm:ss") {
        const ts = new Timestamp(format);
        return ts.display(timeString);
    }

    static showSeconds(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString();
        const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
        return `​${hrs.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
    }

}

module.exports = Util;
