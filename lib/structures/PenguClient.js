const { Client } = require("klasa");
const MusicManager = require("../music/MusicManager.js");
const { Client: IdioticAPI } = require("idiotic-api");
const permissionLevels = require("./permissionLevels.js");

class PenguClient extends Client {

    constructor(options) {
        super({ ...options, permissionLevels });
        this.config = require("../../config.json");
        this.functions = require("../Util/Functions.js");
        this.idiotic = new IdioticAPI(this.config.keys.idiotic, { dev: true });

        this.player = require("../music/LavalinkClient.js");
        this.music = new MusicManager(this);
    }

}

const client = new PenguClient({
    clientOptions: {
        fetchAllMembers: false,
        ownerID: "136549806079344640"
    },
    presence: { activity: { name: "PenguBot.cc | v2.0 | p!help", type: "WATCHING" } },
    prefix: "p!",
    regexPrefix: /^((?:Hey |Ok )?Pengu(?:,|!))/,
    cmdEditing: true,
    disableEveryone: true,
    typing: true,
    providers: {
        default: "rethinkdb",
        rethinkdb: {
            host: "localhost",
            port: 28015,
            user: "admin",
            password: "",
            db: "test",
            silent: true,
            timeout: 30
        }
    },
    disabledEvents: ["GUILD_SYNC",
        "CHANNEL_PINS_UPDATE",
        "USER_NOTE_UPDATE",
        "RELATIONSHIP_ADD",
        "RELATIONSHIP_REMOVE",
        "USER_SETTINGS_UPDATE"],
    readyMessage: (c) => `${c.user.tag}, Ready to serve ${c.guilds.size} guilds and ${c.users.size} users.`
});

module.exports = client;
