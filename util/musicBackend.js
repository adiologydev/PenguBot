const timeString = (ms) => new Date(ms).toISOString().slice(11, -1).slice(0, 8);

const validURL = (str) => {
    const regexp = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (!regexp.test(str)) {
        return false;
    } else { return true; }
};

const timeLeft = (length, currentTime) => timeString(length - currentTime);

module.exports.timeString = timeString;
module.exports.validURL = validURL;
module.exports.timeLeft = timeLeft;
