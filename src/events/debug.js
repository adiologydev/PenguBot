const { Event, config } = require("../index");

module.exports = class extends Event {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: "debug" in config ? config.debug : false
        });
    }

    async run(info) {
        console.log(`[DEBUG] ${info}`);
    }

};
