const { Event } = require("klasa");
const ServerLog = require("../lib/structures/ServerLog");

module.exports = class extends Event {

    async run(role) {
        await new ServerLog(role.guild)
            .setColor("green")
            .setType("roles")
            .setName("Role Created")
            .setMessage(`☑ **${role}** (${role.id}) role was \`created\``)
            .send();
    }

};
