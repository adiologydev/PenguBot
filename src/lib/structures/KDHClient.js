const { DashboardClient } = require("klasa-dashboard-hooks");
const { DataStore } = require("discord.js");

const DashboardUser = require("./KDHUser");

class KDHClient extends DashboardClient {

    constructor(...args) {
        super(...args);

        this.dashboardUsers = new DataStore(this, undefined, DashboardUser);
    }

}

module.exports = KDHClient;
