const { Event } = require("klasa");
const Raven = require("raven");

module.exports = class extends Event {

    run(message, command, params, error) {
        if (error instanceof Error) {
            this.client.emit("wtf", `[COMMAND] ${command.path}\n${error.stack || error}`);
            Raven.captureMessage(`commandError: ${command.name}\n${error.stack || error}`);
        }
        if (error.message) message.sendCode("JSON", error.message).catch(err => this.client.emit("wtf", err));
        else message.sendMessage(error).catch(err => this.client.emit("wtf", err));
    }

};
