const { Event } = require("klasa");
const { WebhookClient } = require("discord.js");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, { once: false });
        this.webhook = new WebhookClient("451318929814716426", this.client.config.webhooks.status);
    }

    async run() {
        this.webhook.send(`☑ **CONNECTED:** Shard \`${this.client.shard.id}\` is now back online.`);
    }

    async init() {
        if (!this.client.config.main.status) this.disable();
    }

};
