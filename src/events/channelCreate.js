const { Event } = require("klasa");

module.exports = class extends Event {

    async run(channel) {
        if (channel.type !== "text") return;
        this.client.emit("customLogs", channel.guild, "channelCreate", { name: "channels", channel: channel });

        const role = channel.guild.roles.filter(r => r.name === "PENGU_MUTED");
        if (role) await channel.updateOverwrite(role, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false }, `New Channel Created`).catch(() => null);
    }

};
