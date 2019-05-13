const { BaseCluster } = require("kurasuta");
const Raven = require("raven");
const { main: { production }, keys: { sentry } } = require("../config.json");
const { execSync } = require("child_process");

Raven.config(sentry, {
    captureUnhandledRejections: true,
    environment: production ? "production" : "development",
    release: execSync("git rev-parse HEAD")
}).install();

module.exports = class extends BaseCluster {

    launch() {
        Raven.context(() => this.client.login(this.manager.token));
    }

};
