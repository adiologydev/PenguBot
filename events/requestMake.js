const { Event } = require("klasa");

module.exports = class extends Event {

    async run() {
        this.client.IPC.sendTo("PenguManager", JSON.stringify({
            t: "Prometheus_REST",
            at: "inc",
            d: {
                c: 1
            }
        }));
    }

};
