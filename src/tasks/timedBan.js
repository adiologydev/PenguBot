const { Task } = require("klasa");
const ModLog = require("../../lib/structures/ModLog");

module.exports = class extends Task {

    constructor(...args) {
        super(...args, { enabled: true });
    }

    async run({ guildID, userID }) {
        const guild = this.client.guilds.get(guildID);
        const user = await this.client.users.fetch(userID).catch(() => null);
        if (!guild || !user) return;

        const bans = await guild.fetchBans();
        if (bans.has(user)) {
            const unban = await guild.members.unban(user).catch(() => null);
            if (!unban) return;
            if (guild.settings.channels.modlogs) {
                new ModLog(guild)
                    .setType("unban")
                    .setModerator(this.client.user)
                    .setReason("Timed Ban Limit Over")
                    .setUser(user)
                    .send();
            }
        }
    }

};
