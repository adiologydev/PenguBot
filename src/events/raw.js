const { Event } = require("klasa");

module.exports = class extends Event {

    async run(data) {
        await this.client.rawEvents.run(data);
    }

};
