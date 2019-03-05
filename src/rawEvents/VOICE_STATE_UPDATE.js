const { RawEvent } = require("../index");

class VoiceStateUpdate extends RawEvent {

    async run(data) {
        const guild = this.client.guilds.get(data.guild_id);
        if (!guild) return;

        await guild.members.fetch(data.user_id).catch(() => null);

        return guild.voiceStates.add(data);
    }

}

module.exports = VoiceStateUpdate;
