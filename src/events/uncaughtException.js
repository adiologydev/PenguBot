const { Event } = require("klasa");
const { captureException } = require("raven");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            emitter: process
        });
    }

    run(err) {
        console.error(`uncaughtException\n${err.stack}`);
        captureException(err);
    }

};
