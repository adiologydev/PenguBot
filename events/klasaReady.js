const { Event } = require("klasa");
const Idiot = require("idiotic-api");

module.exports = class extends Event {

    async run() {
        this.client.idiotic = new Idiot.Client(this.client.config.keys.idiotic, { dev: true });
    }

};
