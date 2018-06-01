const { Event } = require("klasa");

module.exports = class extends Event {

    async run() {
        this.client.whStatus.send(`🔄 **RECONNECTING:** Shard \`${this.client.shard.id}\` is now reconnecting.`);
    }

    async init() {
        if (!this.client.config.main.status) await this.disable();
    }

};
