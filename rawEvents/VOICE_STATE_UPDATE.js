const RawEvent = require("../lib/structures/RawEvent");

class VoiceStateUpdate extends RawEvent {

    constructor(...args) {
        super(...args, { name: "VOICE_STATE_UPDATE" });
    }

    async run(data) {
        const guild = this.client.guilds.get(data.guild_id);
        if (!guild) return;

        await guild.members.fetch(data.user_id).catch(() => null);

        guild.voiceStates.add(data);
    }

}

module.exports = VoiceStateUpdate;
