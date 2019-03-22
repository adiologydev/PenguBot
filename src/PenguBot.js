const { BaseCluster } = require("kurasuta");
const Raven = require("raven");
const { main } = require("./config.json");

module.exports = class extends BaseCluster {

    launch() {
        Raven.context(() => {
            this.client.login(main.token);
        });

        process.on("uncaughtException", err => {
            console.error(`uncaughtException:\n${err.stack}`);
            Raven.captureException(err);
        });
    }

};
