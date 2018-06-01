const { Event } = require("klasa");

module.exports = class extends Event {

    async run() {
        this.client.whStatus.send(`❌ **DISCONNECTED:** Shard \`${this.client.shard.id}\` has disconnected.`);
    }

    async init() {
        if (!this.client.config.main.status) await this.disable();
    }

};
