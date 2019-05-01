const { Event } = require("klasa");
const ServerLog = require("../lib/structures/ServerLog");

module.exports = class extends Event {

    async run(role) {
        await new ServerLog(role.guild)
            .setColor("red")
            .setType("roles")
            .setName("Role Deleted")
            .setMessage(`❌ **${role}** (${role.id}) role was \`deleted\``)
            .send();
    }

};
