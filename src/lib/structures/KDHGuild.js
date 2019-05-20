const DashboardGuild = require("klasa-dashboard-hooks/src/lib/structures/DashboardGuild");

class KDHGuild extends DashboardGuild {

    get guild() {
        return this.client.shard.fetchGuild(this.id) || null;
    }

}

module.exports = KDHGuild;
