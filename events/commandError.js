const { Event } = require("klasa");
const Raven = require("raven");

module.exports = class extends Event {

    constructor(...args) {
        super(...args);
        Raven.config(this.client.config.keys.sentry).install();
    }
    async run(msg, cmd, params, error) {
        Raven.captureMessage(`commandError: ${cmd.name}\n${error}`);
    }

};
