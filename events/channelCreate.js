const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    async run(channel) {
        if (channel.type !== "text") return;
        const log = logger("channels", channel.guild, `📗 **#${channel.name}** (${channel.id}) channel was \`created\``);
        const loggingChannel = channel.guild.channels.get(channel.guild.configs.loggingChannel);
        if (log && loggingChannel) await loggingChannel.send(log);

        const role = channel.guild.roles.filter(r => r.name === "PENGU_MUTED");
        if (role) await channel.updateOverwrite(role, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false }, `New Channel Created`).catch(() => null);
    }

    async init() {
        if (!this.client.gateways.guilds.schema.logs.has("channels")) {
            this.client.gateways.guilds.schema.logs.add("channels", { type: "boolean", default: false });
        }
    }

};
