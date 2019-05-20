const DashboardUser = require("klasa-dashboard-hooks/src/lib/structures/DashboardUser");

require("./KDHGuild");

class KDHUser extends DashboardUser {

    get user() {
        return this.client.shard.fetchUser(this.id) || null;
    }

}

module.exports = KDHUser;
