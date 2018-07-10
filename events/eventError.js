const { Event } = require("klasa");
const Raven = require("raven");

module.exports = class extends Event {

    constructor(...args) {
        super(...args);
        Raven.config(this.client.config.keys.sentry).install();
    }
    async run(event, args, error) {
        Raven.captureMessage(`eventError: ${event.name}\n${error}`);
    }

};
