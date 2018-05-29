const { Event } = require("klasa");
const logger = require("../utils/log");

module.exports = class extends Event {

    async run(oldChannel, newChannel) {
        if (oldChannel.type !== "text") return;
        if (oldChannel.id !== newChannel.id) return;
        const log = logger("channels", oldChannel.guild, `🛠 **#${oldChannel.name}** (${oldChannel.id}) channel was \`updated\``);
        const loggingChannel = oldChannel.guild.channels.get(oldChannel.guild.configs.loggingChannel);
        if (log && loggingChannel) await loggingChannel.send(log);
    }

};
