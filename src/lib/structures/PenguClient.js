const { Client } = require("klasa");
const { Client: IdioticAPI } = require("idiotic-api");
const config = require("../../../config.js");
const { StatsD } = require("hot-shots");

// Custom
const permissionLevels = require(`./permissionLevels`);
const MusicManager = require("./MusicManager");

// Plugins
Client.use(require("klasa-functions").Client);
Client.use(require("klasa-member-gateway"));
if (!config.patreon) Client.use(require("klasa-dashboard-hooks"));

// Schemas
const defaultGuildSchema = require(`./schemas/defaultGuildSchema`);
const defaultClientSchema = require(`./schemas/defaultClientSchema`);
const defaultUserSchema = require(`./schemas/defaultUserSchema`);
const defaultMemberSchema = require(`./schemas/defaultMemberSchema`);

// Extensions
require("../extensions/PenguGuild");

class PenguClient extends Client {

    constructor(options) {
        super({ ...options, permissionLevels, defaultGuildSchema, defaultClientSchema, defaultUserSchema, defaultMemberSchema });

        this.lavalink = null;
        this.idiotic = new IdioticAPI(config.apis.idiotic, { dev: true });
        this.music = new MusicManager();
        this.topCache = [];
        this.health = Object.seal({
            commands: {
                temp: {
                    count: 0,
                    ran: {}
                },
                cmdCount: new Array(60).fill({
                    count: 0,
                    ran: {}
                })
            }
        });
        this.emotes = { check: "<:penguSuccess:435712876506775553>", cross: "<:penguError:435712890884849664>", loading: "<a:penguLoad:435712860744581120>" };
        this.dogstats = new StatsD("localhost", 8125);
    }

}

module.exports = PenguClient;
