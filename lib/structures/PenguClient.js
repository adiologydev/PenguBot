const { Client } = require("klasa");
const { Client: IdioticAPI } = require("idiotic-api");
const { WebhookClient } = require("discord.js");
const permissionLevels = require(`./permissionLevels`);
const RawEventStore = require("./RawEventStore");

class PenguClient extends Client {

    constructor(options) {
        super({ ...options, permissionLevels });

        this.functions = require("../utils/functions.js");
        this.config = require("../../config.json");
        this.lavalink = null;
        this.idiotic = new IdioticAPI(this.config.keys.idiotic, { dev: true });
        this.queue = new Map();
        this.whStatus = new WebhookClient("451318929814716426", this.config.webhooks.status);
        this.topCache = [];
        this.uPosCache = null;
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
    }

}

module.exports = PenguClient;
