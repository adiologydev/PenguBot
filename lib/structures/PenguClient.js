const { Client, KlasaConsole } = require("klasa");
const { Client: IdioticAPI } = require("idiotic-api");
const { WebhookClient } = require("discord.js");
const permissionLevels = require(`./permissionLevels`);
const MusicManager = require("./MusicManager");
const RawEventStore = require("./RawEventStore");
const RESTManager = require("./REST/RESTManager");
const defaultGuildSchema = require(`./schemas/defaultGuildSchema`);
const defaultClientSchema = require(`./schemas/defaultClientSchema`);
const defaultUserSchema = require(`./schemas/defaultUserSchema`);
const config = require("../../config");
const CONSOLE = require("./Console.js");
const { Node } = require("veza");

Client.use(require("klasa-functions").Client);
if (!config.main.patreon) Client.use(require("klasa-dashboard-hooks"));

// Extensions
require("../extensions/PenguGuild");

class PenguClient extends Client {

    constructor(options) {
        super({ ...options, permissionLevels, defaultGuildSchema, defaultClientSchema, defaultUserSchema });

        this.console = new KlasaConsole(this, CONSOLE);
        this.rest = new RESTManager(this, this.options._tokenType);
        this.IPC = new Node(`PenguBot${this.shard.id}`)
            .on("connect", () => this.console.write(["Connected!"], "connectionOpen"));

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

        this.IPC.connectTo("PenguManager", 9999)
            .catch(() => this.console.write(["Disconnected!"], "connectionClose"));
    }

}

module.exports = PenguClient;
