const { Event } = require("klasa");

module.exports = class extends Event {

    async run(channel) {
        if (channel.type === "voice") {
            if (channel.guild.music.queue && !channel.guild.music.voiceChannel) {
                if (channel.guild.music.textChannel) channel.guild.music.textChannel.sendMessage(`${this.client.emotes.check} ***Queue cleared, leaving voice channel.***`).catch(() => null);
                channel.guild.music.destroy();
            }
            return;
        } else if (channel.type === "text") {
            return this.client.emit("customLogs", channel.guild, "channelDelete", { name: "channels", channel: channel });
        }
        return;
    }

};
