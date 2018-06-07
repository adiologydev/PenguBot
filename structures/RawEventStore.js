const { Store } = require("klasa");
const RawEvent = require("./RawEvent");

class RawEventStore extends Store {

    constructor(client) {
        super(client, "rawEvents", RawEvent);
    }

    async run(data) {
        const rawEvent = this.get(data.t);
        if (!rawEvent) return;
        try {
            await rawEvent.run(data.d);
        } catch (error) {
            this.client.console.error(error);
        }
    }

}

module.exports = RawEventStore;
