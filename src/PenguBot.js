const { BaseCluster } = require("kurasuta");
const Raven = require("raven");
const { keys: { sentry } } = require("../config.json");

Raven.config(sentry, { captureUnhandledRejections: true }).install();

module.exports = class extends BaseCluster {

    launch() {
        Raven.context(() => this.client.login(this.manager.token));
    }

};

process.on("uncaughtException", err => {
    console.error(`uncaughtException:\n${err.stack}`);
    Raven.captureException(err);
});
