const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    async run(role) {
        const log = logger("roles", role.guild, `☑ **${role.name}** role was \`created\` in the guild.`);
        const loggingChannel = role.guild.channels.get(role.guild.configs.loggingChannel);
        if (log && loggingChannel) await loggingChannel.send(log);
    }

    async init() {
        if (!this.client.gateways.guilds.schema.logs.has("roles")) {
            this.client.gateways.guilds.schema.logs.add("roles", { type: "boolean", default: false });
        }
    }

};
