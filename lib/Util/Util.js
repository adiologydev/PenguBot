class Util {

    /**
     * @since 2.0.1
     */
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

    /**
	 * Formats the given time into seconds
     * @since 2.0.1
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
