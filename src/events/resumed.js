const { Event } = require("klasa");

module.exports = class extends Event {

    run() {
        this.client.console.warn(`[${this.client.shard.id}]: Reconnected`);
    }

};
