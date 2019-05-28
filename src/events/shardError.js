const { Event } = require("klasa");

module.exports = class extends Event {

    async run(error, shardID) {
        this.client.console.error(`[${shardID}]:`, error);
    }

};
