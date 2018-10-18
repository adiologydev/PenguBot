const { Event } = require("klasa");

module.exports = class extends Event {

    async run() {
        this.client.dogstats.increment("pengubot.guildsremoved");
    }

};
