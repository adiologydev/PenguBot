const { Event } = require("klasa");

module.exports = class extends Event {

    async run(error, shardID) {
        console.error(`[${shardID}]: ${error}`);
    }

};
