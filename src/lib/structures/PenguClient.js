const { Client } = require("klasa");
const { Client: IdioticAPI } = require("idiotic-api");
const { WebhookClient } = require("discord.js");
const config = require("../../../config.json");
const { StatsD } = require("hot-shots");

// Custom
const permissionLevels = require(`./permissionLevels`);
const MusicManager = require("./MusicManager");
const RawEventStore = require("./RawEventStore");

// Plugins
Client.use(require("@kcp/functions").Client);
Client.use(require("klasa-member-gateway"));
if (!config.main.patreon) Client.use(require("klasa-dashboard-hooks"));

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

        this.config = config;
        this.lavalink = null;
        this.idiotic = new IdioticAPI(this.config.keys.idiotic, { dev: true });
        this.music = new MusicManager();
        this.whStatus = new WebhookClient("451318929814716426", this.config.webhooks.status);
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
        this.rawEvents = new RawEventStore(this);
        this.registerStore(this.rawEvents);
        this.emotes = { check: "<:penguSuccess:435712876506775553>", cross: "<:penguError:435712890884849664>", loading: "<a:penguLoad:435712860744581120>" };
        this.dogstats = new StatsD("localhost", 8125);
    }

}

module.exports = PenguClient;
