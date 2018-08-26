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
        this.client.IPC.sendTo("PenguManager", JSON.stringify({
            t: "Prometheus_MESSAGE",
            at: "inc",
            d: {
                c: 1
            }
        }));
    }

};
