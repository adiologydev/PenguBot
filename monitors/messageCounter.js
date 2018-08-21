const { Monitor } = require("klasa");

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            ignoreOthers: false,
            ignoreBots: false,
            ignoreSelf: true
        });
    }

    async run() {
        this.client.prometheus.messageCounter.inc();
    }

};
