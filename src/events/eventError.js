const { Event } = require("klasa");
const Raven = require("raven");

module.exports = class extends Event {

    run(event, args, error) {
        this.client.emit("wtf", `[EVENT] ${event.path}\n${error ? error.stack ? error.stack : error : "Unknown error"}`);
        Raven.captureMessage(`eventError: ${event.name}\n${error ? error.stack ? error.stack : error : "Unknown error"}`);
    }

};
