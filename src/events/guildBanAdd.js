const { Event } = require("klasa");
const ServerLog = require("../lib/structures/ServerLog");

module.exports = class extends Event {

    async run(guild, user) {
        await new ServerLog(guild)
            .setColor("red")
            .setType("moderation")
            .setName("Member Banned")
            .setMessage(`🔨 ${user} (${user.id}) has been **banned**.`)
            .send();
    }

};
