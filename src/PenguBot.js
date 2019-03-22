const { BaseCluster } = require("kurasuta");

module.exports = class extends BaseCluster {

    launch() {
        this.client.login(this.manager.token);
    }

};
