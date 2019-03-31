const { Function } = require("@kcp/functions");

module.exports = class extends Function {

    run(client = this.client) {
        const results = [];
        if (!this.client.config.main.patreon) throw new Error("Not the Patron Bot.");
        for (const guild of client.guilds.values()) {
            if (!this.client.funcs.isPatron(guild)) guild.leave();
            else results.push(`Left ${guild.name} (${guild.id}) of ${guild.owner ? guild.owner.user.tag : "Uncached or Banned Owner"} (${guild.ownerID})`);
        }
        return results;
    }

};
