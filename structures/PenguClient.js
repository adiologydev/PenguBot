const { Client } = require("klasa");
const { Client: IdioticAPI } = require("idiotic-api");
const { WebhookClient } = require("discord.js");
const permissionLevels = require(`./permissionLevels`);
const RawEventStore = require("./RawEventStore");

class PenguClient extends Client {

    constructor(options) {
        super({ ...options, permissionLevels });

        this.config = require("../config.json");
        this.functions = require("../utils/functions.js");
        this.lavalink = null;
        this.idiotic = new IdioticAPI(this.config.keys.idiotic, { dev: true });
        this.queue = new Map();
        this.whStatus = new WebhookClient("451318929814716426", this.config.webhooks.status);
        this.topCache = null;
        this.uPosCache = null;
        this.rawEvents = new RawEventStore(this);
        this.registerStore(this.rawEvents);
    }

}

module.exports = PenguClient;
