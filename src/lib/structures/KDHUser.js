const DashboardUser = require("klasa-dashboard-hooks/src/lib/structures/DashboardUser");
const DashboardGuild = require("./KDHGuild");

class KDHUser extends DashboardUser {

    get user() {
        return this.client.shard.fetchUser(this.id) || null;
    }

    static setupGuilds(dashboardUser, guilds) {
        for (const guild of guilds) dashboardUser.guilds.set(guild.id, new DashboardGuild(dashboardUser.client, guild, dashboardUser));
    }

}

module.exports = KDHUser;
