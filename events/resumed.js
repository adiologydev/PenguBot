const { Event } = require("klasa");

module.exports = class extends Event {

    async run() {
        this.client.whStatus.send(`☑ **CONNECTED:** Shard \`${this.client.shard.id}\` is now back online.`);
    }

    async init() {
        if (!this.client.config.main.status) await this.disable();
    }

};
