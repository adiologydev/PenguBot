const { Event, util } = require("klasa");
const { WebhookClient } = require("discord.js");
const { PlayerManager } = require("discord.js-lavalink");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            once: true,
            event: "ready"
        });
        this.webhook = new WebhookClient("451318929814716426", this.client.config.webhooks.status);
    }

    async run() {
        if (this.client.user.bot) await this.client.fetchApplication();
        if (!this.client.options.ownerID) this.client.options.ownerID = this.client.user.bot ? this.client.application.owner.id : this.client.user.id;

        // Lavalink
        this.client.lavalink = new PlayerManager(this.client, this.client.config.nodes, {
            user: this.client.user.id,
            shards: this.client.shard.count
        });

        // Client-wide settings
        this.client.configs = this.client.gateways.clientStorage.get(this.client.user.id, true);
        await this.client.configs.sync();

        // Init all the pieces
        await Promise.all(this.client.pieceStores.filter(store => !["providers", "extendables"].includes(store.name)).map(store => store.init()));
        util.initClean(this.client);
        this.client.ready = true;

        // Init the schedule
        await this.client.schedule.init();

        if (this.client.options.readyMessage !== null) {
            this.client.emit("log", util.isFunction(this.client.options.readyMessage) ? this.client.options.readyMessage(this.client) : this.client.options.readyMessage);
        }

        this.client.emit("klasaReady");
        this.client.setMaxListeners(50);
        if (this.client.config.main.status) this.webhook.send(`✅ **ONLINE:** Shard \`${this.client.shard.id}\` is now online.`);
    }

};
