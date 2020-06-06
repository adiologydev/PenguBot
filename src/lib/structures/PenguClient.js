const { Client } = require("klasa");
const config = require("../../../config.js");
const { StatsD } = require("hot-shots");

// Custom
const permissionLevels = require(`./permissionLevels`);

// Plugins
Client.use(require("@kcp/functions").Client);
Client.use(require("klasa-member-gateway"));
Client.use(require("@pengubot/music"));
if (!config.patreon) Client.use(require("klasa-api"));

// Schemas
const defaultGuildSchema = require(`./schemas/defaultGuildSchema`);
const defaultClientSchema = require(`./schemas/defaultClientSchema`);
const defaultUserSchema = require(`./schemas/defaultUserSchema`);
const defaultMemberSchema = require(`./schemas/defaultMemberSchema`);

class PenguClient extends Client {

    constructor(options) {
        super({ ...options, permissionLevels, defaultGuildSchema, defaultClientSchema, defaultUserSchema, defaultMemberSchema });
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
    }

}

module.exports = PenguClient;
