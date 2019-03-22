const { BaseCluster } = require("kurasuta");
const Raven = require("raven");
const { keys } = require("../config.json");

Raven.config(keys.sentry, { captureUnhandledRejections: true }).install();

module.exports = class extends BaseCluster {

    launch() {
        Raven.context(() => this.client.login(this.manager.token));
    }

};

process.on("uncaughtException", err => {
    console.error(`uncaughtException:\n${err.stack}`);
    Raven.captureException(err);
});
