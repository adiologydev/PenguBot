const { BaseCluster } = require("kurasuta");
const Raven = require("raven");
const config = require("../config.js");
const { execSync } = require("child_process");

Raven.config(config.apis.sentry, {
    captureUnhandledRejections: true,
    environment: config.production ? "production" : "development",
    release: execSync("git rev-parse HEAD").toString()
}).install();

module.exports = class extends BaseCluster {

    launch() {
        return this.client.login(this.manager.token);
    }

};

process.on("uncaughtException", err => Raven.captureException(err));
process.on("unhandledRejection", err => Raven.captureException(err));
