const { Event } = require("klasa");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run(message) {
        if (!message.guild) return;
        if (message.member.user.id === this.client.user.id) return;
        const log = this.client.log("messages", message.guild, `❌ **Message by ${message.member}** was \`deleted\` in <#${message.channel.id}>`);
        const loggingChannel = message.guild.channels.get(message.guild.configs.loggingChannel);
        if (log) loggingChannel.sendEmbed(log);
    }

    async init() {
        if (!this.client.gateways.guilds.schema.logs.has("messages")) {
            this.client.gateways.guilds.schema.logs.add("messages", { type: "boolean", default: false });
        }
    }

};
