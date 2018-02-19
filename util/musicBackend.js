const timeString = (seconds, forceHours = false) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    return `${forceHours || hours >= 1 ? `${hours}:` : ""}${hours >= 1 ? `0${minutes}`.slice(-2) : minutes}:${`0${Math.floor(seconds % 60)}`.slice(-2)}`;
};

const timeLeft = (length, currentTime) => timeString(length - currentTime);

module.exports.timeString = timeString;
module.exports.timeLeft = timeLeft;
