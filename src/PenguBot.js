const { BaseCluster } = require("kurasuta");
const Raven = require("raven");
const config = require("../config.json");

Raven.config(config.keys.sentry, { captureUnhandledRejections: true }).install();

module.exports = class extends BaseCluster {

    launch() {
        Raven.context(() => {
            this.client.login(config.main.token);
        });
    }

};

process.on("uncaughtException", err => {
    console.error(`uncaughtException:\n${err.stack}`);
    Raven.captureException(err);
});
