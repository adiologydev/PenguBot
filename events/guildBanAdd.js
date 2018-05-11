const { Event } = require("klasa");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run(guild, user) {
        const log = this.client.log("ban", guild, `🔨 **${user.tag}** (${user.id}) was \`banned\``);
        const loggingChannel = guild.channels.get(guild.configs.loggingChannel);
        if (!log) return;
        return loggingChannel.sendEmbed(log);
    }

    async init() {
        if (!this.client.gateways.guilds.schema.logs.has("ban")) {
            this.client.gateways.guilds.schema.logs.add("ban", { type: "boolean", default: false });
        }
    }

};
