const klasa = require("klasa");
const discord = require("discord.js");
const klasaApi = require("klasa-api");
const klasaFunctions = require("@kcp/functions");
const { version } = require("../package.json");

module.exports = {
    ...klasa,
    ...discord,
    ...klasaApi,
    ...klasaFunctions,
    Util: require("./lib/util/Util"),
    util: require("./lib/util/Util"),
    config: require("../config.js"),
    klasaUtil: klasa.util,
    discordUtil: discord.Util,
    version,
    klasaVersion: klasa.version,
    discordVersion: discord.version,
    klasaConstants: klasa.constants,
    discordConstants: discord.Constants,
    Command: require("./lib/structures/KlasaCommand"),
    MusicCommand: require("./lib/structures/MusicCommand"),
    ModLog: require("./lib/structures/ModLog"),
    ServerLog: require("./lib/structures/ServerLog"),
    Song: require("./lib/structures/Song")
};
