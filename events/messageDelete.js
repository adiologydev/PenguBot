const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    async run(message) {
        if (!message.guild) return;
        if (message.author.bot) return;
        if (message.author.id === "438049470094114816" || message.author.id === "303181184718995457") return;
        const log = logger("messages", message.guild, `❌ **Message by ${message.member}** was \`deleted\` in <#${message.channel.id}>\n**Content:**\n${message.content}`, `${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL());
        const loggingChannel = message.guild.channels.fetch(message.guild.configs.loggingChannel);
        if (log && loggingChannel) loggingChannel.send(log);
    }

    async init() {
        if (!this.client.gateways.guilds.schema.logs.has("messages")) {
            this.client.gateways.guilds.schema.logs.add("messages", { type: "boolean", default: false });
        }
    }

};
