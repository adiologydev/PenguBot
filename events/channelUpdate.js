const { Event } = require("klasa");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run(oldChannel) {
        if (!oldChannel.type === "text") return;
        const log = this.client.log("channels", oldChannel.guild, `🛠 **#${oldChannel.name}** (${oldChannel.id}) channel was \`updated\``);
        const loggingChannel = oldChannel.guild.channels.get(oldChannel.guild.configs.loggingChannel);
        if (!log) return;
        return loggingChannel.sendEmbed(log);
    }

};
