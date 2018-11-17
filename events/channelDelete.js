const { Event } = require("klasa");

module.exports = class extends Event {

    async run(channel) {
        if (channel.type === "voice") {
            if (channel.guild.music.voiceChannel.id === channel.id) return channel.guild.music.destroy();
            if (channel.guild.music.queue && !channel.guild.music.voiceChannel) return channel.guild.music.destroy();
            return;
        } else if (channel.type === "text") {
            return this.client.emit("customLogs", channel.guild, "channelDelete", { name: "channels", channel: channel });
        }
        return;
    }

};
