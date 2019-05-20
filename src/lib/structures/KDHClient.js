const { DashboardClient } = require("klasa-dashboard-hooks");

require("./KDHUser");

class KDHClient extends DashboardClient {}

module.exports = KDHClient;
