const { Client } = require("klasa");
const { Client: IdioticAPI } = require("idiotic-api");
const { WebhookClient } = require("discord.js");
const permissionLevels = require(`./permissionLevels`);
const MusicManager = require("./MusicManager");
const RawEventStore = require("./RawEventStore");
const RESTManager = require("./REST/RESTManager");
const defaultGuildSchema = require(`./schemas/defaultGuildSchema`);
const defaultClientSchema = require(`./schemas/defaultClientSchema`);
const defaultUserSchema = require(`./schemas/defaultUserSchema`);
const promClient = require("prom-client");

Client.use(require("klasa-functions").Client);

// Extensions
require("../extensions/PenguGuild");

class PenguClient extends Client {

    constructor(options) {
        super({ ...options, permissionLevels, defaultGuildSchema, defaultClientSchema, defaultUserSchema });

        this.rest = new RESTManager(this, this.options._tokenType);

        this.config = require("../../config.json");
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

        this.prometheus = {
            guildGauge: new promClient.Gauge({ name: "pengubot_guild_count", help: "A metric for storing Pengus guild count" }),
            messageCounter: new promClient.Counter({ name: "pengubot_message_count", help: "A counter to display the number of registered messages" }),
            voiceGauge: new promClient.Gauge({ name: "pengubot_voicestream_count", help: "A gauge to display current voice streams" }),
            restCounter: new promClient.Counter({ name: "pengubot_request_count", help: "A counter to display the number of discord api requests" }),
            commands: {
                executions: new promClient.Gauge({ name: "pengubot_command_executions", help: "A metric for tracking command executions", labelNames: ["name"] }),
                categories: new promClient.Gauge({ name: "pengubot_category_executions", help: "A metric for tracking category executions", labelNames: ["name"] }),
                counter: new promClient.Counter({ name: "pengubot_command_count", help: "A counter to display the number of used commands" })
            }
        };
    }

}

module.exports = PenguClient;
