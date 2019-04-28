const { Event } = require("klasa");

module.exports = class extends Event {

    async run() {
        this.client.console.warn(`[${this.client.shard.id}]: Reconnecting`);
    }

};
