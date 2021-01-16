const { Client, Gateway } = require("klasa");
const config = require("../../../config.js");
const { StatsD } = require("hot-shots");

// Extensions
require("./PenguGuild");
require("./PenguMember");

// Custom
const permissionLevels = require(`./permissionLevels`);

// Plugins
Client.use(require("@kcp/functions").Client);
if (config.musicEnabled) Client.use(require("@pengubot/music"));
if (config.apiEnabled) Client.use(require("klasa-api"));

// Schemas
const defaultMemberSchema = require(`./schemas/defaultMemberSchema`);
const defaultGuildSchema = require(`./schemas/defaultGuildSchema`);
const defaultClientSchema = require(`./schemas/defaultClientSchema`);
const defaultUserSchema = require(`./schemas/defaultUserSchema`);

class PenguClient extends Client {

    constructor(options) {
        super({ ...options, permissionLevels, defaultGuildSchema, defaultClientSchema, defaultUserSchema });
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

        this.version = "2.0.0";
        this.userAgent = `PenguBot/${this.version}/${this.options.production ? "Production" : "Development"}`;

        this.gateways.register(new Gateway(this, "members", { schema: defaultMemberSchema }));
    }

}

module.exports = PenguClient;
