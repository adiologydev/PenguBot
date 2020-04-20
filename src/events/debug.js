const { Event, config } = require("../index");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: "debug" in config ? config.debug : false
        });
    }

    async run(info) {
        console.log(`[DEBUG] ${info}`);
    }

};
