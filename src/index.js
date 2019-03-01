const klasa = require("klasa");
const discord = require("discord.js");
const { version } = require("../package.json");

module.exports = {
    ...klasa,
    ...discord,
    klasaUtil: klasa.util,
    discordUtil: discord.Util,
    version,
    klasaVersion: klasa.version,
    discordVersion: discord.version,
    klasaConstants: klasa.constants,
    discordConstants: discord.Constants,
    Song: require("./lib/structures/Song")
};
