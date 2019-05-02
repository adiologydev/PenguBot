const { Event } = require("klasa");
const ServerLog = require("../lib/structures/ServerLog");

module.exports = class extends Event {

    async run(guild, user) {
        await new ServerLog(guild)
            .setColor("yellow")
            .setType("moderation")
            .setName("Member Unbanned")
            .setMessage(`🔨 ${user} (${user.id}) has been **unbanned**.`)
            .send();
    }

};
