const { Event } = require("klasa");
const ServerLog = require("../lib/structures/ServerLog");

module.exports = class extends Event {

    async run(messages) {
        if (!messages.first().guild) return;

        await new ServerLog(messages.first().guild)
            .setColor("red")
            .setType("messages")
            .setName("Bulk Messages Deleted")
            .setMessage(`❌ \`${messages.size}\` Messages Deleted in ${messages.first().channel}`)
            .send();
    }


};
