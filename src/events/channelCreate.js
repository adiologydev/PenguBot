const { Event } = require("klasa");
const ServerLog = require("../lib/structures/ServerLog");

module.exports = class extends Event {

    async run(channel) {
        if (channel.type !== "text") return;
        await new ServerLog(channel.guild)
            .setColor("green")
            .setType("channels")
            .setName("Channel Created")
            .setMessage(`📗 **#${channel.name}** (${channel.id}) channel was \`created\``)
            .send();

        const role = channel.guild.roles.filter(r => r.name === "PENGU_MUTED");
        if (role) await channel.updateOverwrite(role, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false }, `New Channel Created`).catch(() => null);
    }

};
