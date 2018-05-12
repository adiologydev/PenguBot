const { Timestamp } = require("klasa");

class Util {

    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

    /**
	 * Turns a time string into a formated one
	 * @param {string} timeString the inputed duration to format
	 * @param {string} [timeFormatString] The format to use
	 * @returns {string}
	 */
    static formatTime(timeString, timeFormatString = "hh:mm:ss") {
        const ts = new Timestamp(timeFormatString);
        return ts.display(timeString);
    }

    /**
	 * Formats the given time into seconds
	 * @param {number} ms the inputed duration to format
	 * @returns {string}
	 */
    static showSeconds(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString();
        const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
        return `​${hrs.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
    }

}

module.exports = Util;
